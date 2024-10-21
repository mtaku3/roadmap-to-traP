package model

import "github.com/google/uuid"

type TraqEvent struct {
	Base
	EventID uuid.UUID `json:"event_id"`

	LectureID uuid.UUID `gorm:"size:191" json:"lecture_id"`
	Lecture   Lecture   `gorm:"foreignKey:LectureID" json:"-"`
}
