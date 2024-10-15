package api

import (
	"context"
	"net/http"
	"roadmap-to-trap/api/knoq"
	"roadmap-to-trap/api/traq"
)

var Traq traq.Client
var Knoq knoq.Client

func Init() error {
	traqAuthTransport, err := traq.NewTraqAuthTransport(http.DefaultTransport)
	if err != nil {
		return err
	}

	traqAuthClient := &http.Client{
		Transport: traqAuthTransport,
	}

	traqClient, err := traq.NewClient("https://q.trap.jp/api/v3", &emptySecuritySource{}, traq.WithClient(traqAuthClient))
	if err != nil {
		return err
	}

	Traq = *traqClient

	knoqAuthTransport, err := knoq.NewKnoqAuthTransport(traqAuthTransport)

	knoqAuthClient := &http.Client{
		Transport: knoqAuthTransport,
	}

	knoqClient, err := knoq.NewClient("https://knoq.trap.jp/api", knoq.WithClient(knoqAuthClient))
	if err != nil {
		return err
	}

	Knoq = *knoqClient

	return nil
}

type emptySecuritySource struct{}

func (t *emptySecuritySource) OAuth2(ctx context.Context, operationName string) (traq.OAuth2, error) {
	return traq.OAuth2{
		Token:  "",
		Scopes: []string{},
	}, nil
}

func (t *emptySecuritySource) BearerAuth(ctx context.Context, operationName string) (traq.BearerAuth, error) {
	return traq.BearerAuth{
		Token: "",
	}, nil
}
