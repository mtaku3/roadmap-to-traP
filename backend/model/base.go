package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type Base struct {
	ID        uuid.UUID `gorm:"primaryKey"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

func (base *Base) BeforeCreate(tx *gorm.DB) error {
	if base.ID != uuid.Nil {
		return nil
	}
	uuid, err := uuid.NewV7()
	if err != nil {
		return err
	}
	base.ID = uuid
	return nil
}
