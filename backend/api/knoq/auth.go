package knoq

import (
	"bytes"
	"encoding/json"
	"errors"
	"net/http"
	"time"
)

type KnoqAuthSession struct {
	value     string
	expiresAt time.Time
}

type KnoqAuthTransport struct {
	wrapped http.RoundTripper

	session *KnoqAuthSession
}

var ErrAuthFailed = errors.New("Authentication failed")

func NewKnoqAuthTransport(transport http.RoundTripper) (*KnoqAuthTransport, error) {
	return &KnoqAuthTransport{
		wrapped: transport,
	}, nil
}

func getAuthUrlWithSession(client http.Client) (*string, *string, error) {
	var data struct {
		Url string `json:"url"`
	}
	var session string

	req, err := http.NewRequest(http.MethodPost, "https://knoq.trap.jp/api/authParams", nil)
	if err != nil {
		return nil, nil, err
	}

	res, err := client.Do(req)
	if err != nil {
		return nil, nil, err
	}
	defer res.Body.Close()
	if res.StatusCode != http.StatusCreated {
		return nil, nil, errors.New("Failed to get knoQ OAuth2 Authorization URL")
	}

	err = json.NewDecoder(res.Body).Decode(&data)
	if err != nil {
		return nil, nil, err
	}

	cookies := res.Cookies()
	found := false
	for _, cookie := range cookies {
		if cookie.Name == "session" {
			session = cookie.Value
			found = true
			break
		}
	}
	if !found {
		return nil, nil, errors.New("Cookie session not found in knoq authParams response")
	}

	return &data.Url, &session, nil
}

func letTraqKnowAuthUrl(client http.Client, authUrl string) error {
	req, err := http.NewRequest(http.MethodGet, authUrl, nil)
	if err != nil {
		return err
	}

	res, err := client.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()
	if res.StatusCode != http.StatusFound {
		return errors.New("Failed to let traQ know knoQ OAuth2 Authorization URL")
	}

	return nil
}

func approveAndGetCallbackUrl(client http.Client, authUrl string) (*string, error) {
	body := []byte(`{"submit":"approve"}`)
	req, err := http.NewRequest(http.MethodPost, "https://q.trap.jp/api/v3/oauth2/authorize/decide", bytes.NewBuffer(body))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Referer", authUrl)
	req.Header.Set("Content-Type", "application/json")

	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()
	if res.StatusCode != http.StatusFound {
		return nil, errors.New("Failed to get knoQ OAuth2 Callback URL")
	}

	callbackUrl := res.Header.Get("Location")
	return &callbackUrl, nil
}

func (t *KnoqAuthTransport) getSession() (*KnoqAuthSession, error) {
	client := http.Client{
		Transport: t.wrapped,
		CheckRedirect: func(req *http.Request, via []*http.Request) error {
			return http.ErrUseLastResponse
		},
	}

	authUrl, session, err := getAuthUrlWithSession(client)
	if err != nil {
		return nil, err
	}

	err = letTraqKnowAuthUrl(client, *authUrl)
	if err != nil {
		return nil, err
	}

	callbackUrl, err := approveAndGetCallbackUrl(client, *authUrl)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(http.MethodGet, *callbackUrl, nil)
	if err != nil {
		return nil, err
	}
	req.AddCookie(&http.Cookie{
		Name:   "session",
		Value:  *session,
		Quoted: false,

		Path:   "/api",
		Domain: "knoq.trap.jp",

		Secure:   true,
		HttpOnly: true,
		SameSite: http.SameSiteStrictMode,
	})

	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()
	if res.StatusCode != http.StatusFound {
		return nil, errors.New("Failed to login to knoQ")
	}

	cookies := res.Cookies()
	for _, cookie := range cookies {
		if cookie.Name == "session" {
			return &KnoqAuthSession{
				value:     cookie.Value,
				expiresAt: cookie.Expires,
			}, nil
		}
	}

	return nil, errors.New("Cookie session not found in knoQ OAuth2 callback response")
}

func (t *KnoqAuthTransport) update() error {
	session, err := t.getSession()
	if err != nil {
		return err
	}

	t.session = session
	return nil
}

func (t *KnoqAuthTransport) RoundTrip(req *http.Request) (*http.Response, error) {
	if t.session == nil || t.session != nil && time.Now().After(t.session.expiresAt) {
		err := t.update()
		if err != nil {
			return nil, errors.Join(err, ErrAuthFailed)
		}
	}

	req.Header.Del("Authorization")
	req.AddCookie(&http.Cookie{
		Name:   "session",
		Value:  t.session.value,
		Quoted: false,

		Path:   "/api",
		Domain: "knoq.trap.jp",

		Secure:   true,
		HttpOnly: true,
		SameSite: http.SameSiteStrictMode,
	})

	return t.wrapped.RoundTrip(req)
}
