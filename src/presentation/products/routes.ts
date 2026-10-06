import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { CategoryService } from "../services/category.service.js";
import { ProductsController } from "./controller.js";


export class ProductsRoutes { 

    static get routes(): Router { 
        const router = Router();

        const controller = new ProductsController()
        router.post('/', [AuthMiddleware.validateJWT], controller.createProduct)
        router.get('/',  controller.getProduct)


        return router;
    }

}