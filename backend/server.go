package main

import (
	"roadmap-to-trap/api"
	"roadmap-to-trap/log"
	"roadmap-to-trap/model"
	"roadmap-to-trap/router"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)

func main() {
	err := log.Init()
	if err != nil {
		panic("Failed to initialize logger")
	}
	defer log.Logger.Sync()

	err = godotenv.Load()
	if err != nil {
		panic("Failed to load .env file")
	}

	err = model.Init()
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

	err = api.Init()
	if err != nil {
		panic("Failed to initialize API clients")
	}

	e := echo.New()
	router.Init(e)
	e.Logger.Fatal(e.Start(":1323"))
}
