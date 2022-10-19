package admin

import (
	"github.com/gofiber/fiber/v2"
)

func Dashboard(c *fiber.Ctx) error {
	return c.Render("Dashboardsss", fiber.Map{})

}
