import type { Request, Response } from "express"
import { RegisterUserDto } from "../../domain/index.js"
import type { AuthService } from "../services/auth.service.js"

export class AuthController{

    // DI
    constructor(
        public readonly authService: AuthService,
    ){}

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)
        if(error) return res.status(400).json({error})

        this.authService.registerUser(registerUserDto!)
            .then((user) => res.json(user))
    }

    
    loginUser = (req: Request, res: Response) => {
        res.json("Controller from loginUser")
    }
    
    validateUser = (req: Request, res: Response) => {
        res.json("Controller from validateUser")
    }
}