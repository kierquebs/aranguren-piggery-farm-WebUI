package admin

import (
	"github.com/gofiber/fiber/v2"
)

func Login(c *fiber.Ctx) error {
	return c.Render("Login", fiber.Map{})

}
