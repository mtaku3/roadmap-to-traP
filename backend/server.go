package main

import (
	"roadmap-to-trap/model"
	"roadmap-to-trap/router"

	"github.com/labstack/echo/v4"
)

func main() {
	err := model.Init()
	if err != nil {
		panic("Failed to connect to database")
	}
	err = model.Migrate()
	if err != nil {
		panic("Failed to migrate database")
	}
	err = model.Seed()
	if err != nil {
		panic("Failed to seed database")
	}

	e := echo.New()
	router.Init(e)
	e.Logger.Fatal(e.Start(":1323"))
}
