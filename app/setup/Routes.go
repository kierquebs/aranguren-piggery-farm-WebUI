package setup

import (
	"github.com/kierquebs/aranguren-piggery-farm-WebUI/app/view/admin"
	"github.com/kierquebs/aranguren-piggery-farm-WebUI/app/view/client"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func Routes(app *fiber.App) {

	adminGroup := app.Group("/admin", logger.New())
	adminGroup.Get("/information-of-pigs/:token", admin.InformationOfPigs) // /admin/dashboard
	adminGroup.Get("/purchase-history/:token", admin.PurchaseHistory)      // /admin/purchase-history
	adminGroup.Get("/appointment/:token", admin.Appointment)               // /admin/appointment
	adminGroup.Get("/login", admin.Login)                                  // /admin/dashboard

	indexGroup := app.Group("/", logger.New())
	indexGroup.Get("/", client.Index)

}
