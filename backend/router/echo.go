package router

import (
	"net/http"
	"roadmap-to-trap/log"
	"roadmap-to-trap/model"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.uber.org/zap"
)

func Init(e *echo.Echo) {
	e.Use(newAuthMiddleware())

	e.Use(middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{
		LogURI:    true,
		LogStatus: true,
		LogValuesFunc: func(c echo.Context, v middleware.RequestLoggerValues) error {
			log.Logger.Info("request",
				zap.String("URI", v.URI),
				zap.Int("status", v.Status),
			)

			return nil
		},
	}))

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello World!")
	})

	e.GET("/v1/user/me", func(c echo.Context) error {
		user := c.Get("user").(model.User)
		return c.JSON(http.StatusOK, user)
	})
}
