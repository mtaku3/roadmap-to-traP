package model

import "github.com/google/uuid"

type Lecture struct {
	Base
	Title       string
	Description string
	memo        string
	order       uint

	WorkshopID uuid.UUID `gorm:"size:191"`
	Workshop   Workshop  `gorm:"foreignKey:WorkshopID"`

	Events []TraqEvent
}
