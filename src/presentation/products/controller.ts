import type { Request, Response } from "express"
import { CustomError, PagitaionDto } from "../../domain/index.js"


export class ProductsController { 

    // DI
    constructor(
        // TODO: private readonly productService: ProductService
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message})   
        }

        console.log(`${error}`)
        return res.status(500).json({error: "Internal server error"})
    }


    createProduct = (req: Request, res: Response ) => {
        res.json('From create Product')

    }


    getProduct = async(req: Request, res: Response) => { 
        const {page = 1, limit = 10 } = req.query
        const [error, paginationDto ] = PagitaionDto.create(+page, +limit)
        if(error) return res.status(400).json({error});

        res.json('From get Product')


    }


}