package log 

import "go.uber.org/zap"

var Logger zap.Logger

func Init() error {
	logger, err := zap.NewProduction()
	if err != nil {
		return err
	}
	Logger = *logger
	return nil
}
