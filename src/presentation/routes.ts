import { Router } from 'express';
import { AuthRoutes } from './auth/routes.js';
import { CategoryRoutes } from './categories/routes.js';
import { ProductsRoutes } from './products/routes.js';





export class AppRoutes {


  static get routes(): Router {

    const router = Router();


    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes );
    router.use('/api/categories', CategoryRoutes.routes)
    router.use('/api/products', ProductsRoutes.routes)
    


    return router;
  }


}

