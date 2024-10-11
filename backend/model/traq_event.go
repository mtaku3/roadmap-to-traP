package model

import "github.com/google/uuid"

type TraqEvent struct {
	Base
	EventID uuid.UUID

	LectureID uuid.UUID `gorm:"size:191"`
	Lecture   Lecture   `gorm:"foreignKey:LectureID"`
}
