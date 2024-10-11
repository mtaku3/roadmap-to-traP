package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm/clause"
)

type Workshop struct {
	Base
	Title       string
	Description string
	Memo        string

	SchoolYearID uuid.UUID  `gorm:"size:191"`
	SchoolYear   SchoolYear `gorm:"foreignKey:SchoolYearID"`

	AuthorID uuid.UUID `gorm:"size:191"`
	Author   User      `gorm:"foreignKey:AuthorID"`

	DependsOn []*Workshop `gorm:"many2many:client_suppliers"`
}

func GetWorkshop(id uuid.UUID) (Workshop, error) {
	workshop := Workshop{}
	err := db.Preload(clause.Associations).First(&workshop, id).Error
	if err != nil {
		return Workshop{}, err
	}
	return workshop, nil
}

func GetWorkshopBySchoolYear(schoolYearId uuid.UUID) ([]Workshop, error) {
	workshops := []Workshop{}
	err := db.Preload(clause.Associations).Where("school_year_id = ?", schoolYearId).Find(&workshops).Error
	if err != nil {
		return []Workshop{}, err
	}
	return workshops, nil
}

func CreateWorkshop(workshop *Workshop) error {
	return db.Create(workshop).Error
}

func UpdateWorkshop(workshop *Workshop) error {
	return db.Save(workshop).Error
}
