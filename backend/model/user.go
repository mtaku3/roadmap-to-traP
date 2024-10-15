package model

type User struct {
	Base
	TrapName  string     `gorm:"unique" json:"trap_name"`
	Workshops []Workshop `gorm:"foreignKey:AuthorID" json:"-"`
}

func GetUserByTrapName(trapName string) (User, error) {
	user := User{}
	err := db.Where("trap_name = ?", trapName).First(&user).Error
	if err != nil {
		return User{}, err
	}
	return user, nil
}

func CreateUser(user *User) error {
	return db.Create(user).Error
}
