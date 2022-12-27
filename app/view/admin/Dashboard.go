package admin

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/kierquebs/aranguren-piggery-farm-WebUI/app/controller/token"
)

func Dashboard(c *fiber.Ctx) error {
	t := c.Params("token")
	fmt.Println(token.Validate(t))
	if token.Validate(t) {
		return c.Render("Dashboard", fiber.Map{
			"token": t,
		})
	}
	return c.Render("Re-Login", fiber.Map{})

}
