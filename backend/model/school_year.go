package model

type SchoolYear struct {
	Base
	Year        uint `gorm:"unique"`
	DisplayName string
	ShortName   string

	Workshops []Workshop
}

func GetSchoolYearByYear(year uint) (SchoolYear, error) {
	schoolYear := SchoolYear{}
	err := db.Where("year = ?", year).First(&schoolYear).Error
	if err != nil {
		return SchoolYear{}, err
	}
	return schoolYear, nil
}

func CreateSchoolYear(schoolYear *SchoolYear) error {
	return db.Create(schoolYear).Error
}

func UpdateSchoolYear(schoolYear *SchoolYear) error {
	return db.Save(schoolYear).Error
}
