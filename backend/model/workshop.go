package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type Workshop struct {
	Base
	Title       string `json:"title"`
	Description string `json:"description"`
	Memo        string `json:"memo"`

	SchoolYearID uuid.UUID  `gorm:"size:191" json:"school_year_id"`
	SchoolYear   SchoolYear `gorm:"foreignKey:SchoolYearID" json:"-"`

	AuthorID uuid.UUID `gorm:"size:191" json:"author_id"`
	Author   User      `gorm:"foreignKey:AuthorID" json:"author"`

	DependsOn []*Workshop `gorm:"many2many:client_suppliers" json:"-"`

	Lectures []Lecture `json:"lectures"`
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
	return db.Transaction(func(tx *gorm.DB) error {
		if err := db.Omit(clause.Associations).Create(workshop).Error; err != nil {
			return err
		}
		if err := db.Model(workshop).Association("DependsOn").Replace(workshop.DependsOn); err != nil {
			return err
		}
		return nil
	})
}

func UpdateWorkshop(workshop *Workshop) error {
	return db.Transaction(func(tx *gorm.DB) error {
		if err := db.Omit(clause.Associations).Updates(workshop).Error; err != nil {
			return err
		}
		if err := db.Model(workshop).Association("DependsOn").Replace(workshop.DependsOn); err != nil {
			return err
		}
		return nil
	})
}
