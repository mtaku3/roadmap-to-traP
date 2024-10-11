package model

func Seed() error {
	return seedSchoolYears()
}

func seedSchoolYears() error {
	seeds := []SchoolYear{
		SchoolYear{
			Year:        2024,
			DisplayName: "2024年度",
			ShortName:   "'24",
		},
	}
	return db.Save(&seeds).Error
}
