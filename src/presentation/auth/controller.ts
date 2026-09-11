import type { Request, Response } from "express"

export class AuthController{

    // DI
    constructor(){}

    registerUser = (req: Request, res: Response) => {
        res.json("Controller from registreUser")
    }

    
    loginUser = (req: Request, res: Response) => {
        res.json("Controller from loginUser")
    }
    
    validateUser = (req: Request, res: Response) => {
        res.json("Controller from validateUser")
    }
}