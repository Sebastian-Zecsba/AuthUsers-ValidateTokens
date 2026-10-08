import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { ProductsController } from "./controller.js";
import { ProductService } from "../services/product.service.js";


export class ProductsRoutes { 

    static get routes(): Router { 
        const router = Router();
        const productService = new ProductService()
        const controller = new ProductsController(productService)


        router.get('/',  controller.getProduct)
        router.post('/', [AuthMiddleware.validateJWT], controller.createProduct)


        return router;
    }

}