import { Router } from "express";
import { CategoryController } from "./controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { CategoryService } from "../services/category.service.js";


export class CategoryRoutes { 

    static get routes(): Router { 
        const router = Router();

        const categoryService = new CategoryService();
        const controller = new CategoryController(categoryService);

        router.post('/', [AuthMiddleware.validateJWT] ,controller.createCategory)
        router.get('/', [AuthMiddleware.validateJWT], controller.getCategories)


        return router;
    }

}