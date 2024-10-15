package traq

import (
	"bytes"
	"encoding/json"
	"errors"
	"net/http"
	"os"
	"time"
)

type TraqAuthSession struct {
	value     string
	expiresAt time.Time
}

type TraqAuthTransport struct {
	wrapped http.RoundTripper

	session *TraqAuthSession
}

var ErrAuthFailed = errors.New("Authentication failed")

func NewTraqAuthTransport(transport http.RoundTripper) (*TraqAuthTransport, error) {
	return &TraqAuthTransport{
		wrapped: transport,
	}, nil
}

func (t *TraqAuthTransport) getSession() (*TraqAuthSession, error) {
	client := http.Client{
		Transport: t.wrapped,
		CheckRedirect: func(req *http.Request, via []*http.Request) error {
			return http.ErrUseLastResponse
		},
	}

	username := os.Getenv("TRAQ_USERNAME")
	password := os.Getenv("TRAQ_PASSWORD")
	if username == "" || password == "" {
		return nil, errors.New("TRAQ_USERNAME or TRAQ_PASSWORD is not set")
	}

	body, err := json.Marshal(struct {
		Username string `json:"name"`
		Password string `json:"password"`
	}{
		Username: username,
		Password: password,
	})
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(http.MethodPost, "https://q.trap.jp/api/v3/login", bytes.NewBuffer(body))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")

	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()
	if 400 <= res.StatusCode {
		return nil, errors.New("Failed to login to traQ")
	}

	cookies := res.Cookies()
	for _, cookie := range cookies {
		if cookie.Name == "r_session" {
			return &TraqAuthSession{
				value:     cookie.Value,
				expiresAt: cookie.Expires,
			}, nil
		}
	}

	return nil, errors.New("Cookie r_session not found in traQ login response")
}

func (t *TraqAuthTransport) update() error {
	session, err := t.getSession()
	if err != nil {
		return err
	}

	t.session = session
	return nil
}

func (t *TraqAuthTransport) RoundTrip(req *http.Request) (*http.Response, error) {
	if t.session == nil || t.session != nil && time.Now().After(t.session.expiresAt) {
		err := t.update()
		if err != nil {
			return nil, errors.Join(err, ErrAuthFailed)
		}
	}

	req.Header.Del("Authorization")
	req.AddCookie(&http.Cookie{
		Name:   "r_session",
		Value:  t.session.value,
		Quoted: false,

		Path:   "/api/v3",
		Domain: "q.trap.jp",

		Secure:   true,
		HttpOnly: true,
		SameSite: http.SameSiteStrictMode,
	})

	return t.wrapped.RoundTrip(req)
}
