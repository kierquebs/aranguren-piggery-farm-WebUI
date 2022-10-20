package setup

import (
	"github.com/kierquebs/aranguren-piggery-farm-WebUI/app/view/admin"
	"github.com/kierquebs/aranguren-piggery-farm-WebUI/app/view/client"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func Routes(app *fiber.App) {

	adminGroup := app.Group("/admin", logger.New())
	adminGroup.Get("/dashboard", admin.Dashboard) // /admin/dashboard

	indexGroup := app.Group("/", logger.New())
	indexGroup.Get("/", client.Index)

}
