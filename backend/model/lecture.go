package model

import "github.com/google/uuid"

type Lecture struct {
	Base
	Title       string `json:"title"`
	Description string `json:"description"`
	Memo        string `json:"memo"`
	Order       uint   `json:"order"`

	WorkshopID uuid.UUID `gorm:"size:191" json:"workshop_id"`
	Workshop   Workshop  `gorm:"foreignKey:WorkshopID" json:"-"`

	Events []TraqEvent `json:"events"`
}
