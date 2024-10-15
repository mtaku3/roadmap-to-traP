package router

import (
	"os"
	"roadmap-to-trap/log"
	"roadmap-to-trap/model"
	"roadmap-to-trap/util"

	"github.com/labstack/echo/v4"
)

func newAuthMiddleware() echo.MiddlewareFunc {
	debugForwardedUser := os.Getenv("DEBUG_FORWARDED_USER")
	if debugForwardedUser != "" {
		log.Logger.Warn("DEBUG_FORWARDED_USER is set. This is only for debugging purposes. Do not use in production.")
	}

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			trapName := c.Request().Header.Get("X-Forwarded-User")
			if debugForwardedUser != "" {
				trapName = debugForwardedUser
			}
			user, err := model.GetUserByTrapName(trapName)
			if util.IsErrRecordNotFound(err) {
				user = model.User{TrapName: trapName}
				err := model.CreateUser(&user)
				if err != nil {
					next(c)
					return nil
				}
			} else if err != nil {
				next(c)
				return nil
			}
			c.Set("user", user)
			next(c)
			return nil
		}
	}
}
