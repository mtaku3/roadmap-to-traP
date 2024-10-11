package router

import (
	"roadmap-to-trap/model"
	"roadmap-to-trap/util"

	"github.com/labstack/echo/v4"
)

func authMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		trapName := c.Request().Header.Get("X-Forwarded-User")
		trapName = "mtaku3"
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
