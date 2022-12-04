package token

import (
	"log"

	"github.com/kierquebs/aranguren-piggery-farm-WebUI/app/config"
	"github.com/kierquebs/aranguren-piggery-farm-WebUI/app/controller/transfer"
)

func Validate(token string) bool {
	req, err := transfer.Request("POST", config.Env("VALIDATE_TOKEN")+token, []byte{})
	if err != nil {
		log.Println("Unable to Process Request :: Unknown/Unreachable API, ", err)
		return false
	}
	if string(req) != "" {
		return false
	}
	return true

}
