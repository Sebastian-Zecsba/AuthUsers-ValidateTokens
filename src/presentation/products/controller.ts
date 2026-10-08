import type { Request, Response } from "express"
import { CreateProductDto, CustomError, PagitaionDto } from "../../domain/index.js"
import type { ProductService } from "../services/product.service.js"


export class ProductsController { 

    // DI
    constructor(
        private readonly productService: ProductService
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message})   
        }

        console.log(`${error}`)
        return res.status(500).json({error: "Internal server error"})
    }


    createProduct = (req: Request, res: Response ) => {
        const [ error, createProductDto] = CreateProductDto.create({
            ...req.body,
            user: req.body.user.id
        })
        if(error) return res.status(400).json({error});
        
        this.productService.createProducts(createProductDto!)
            .then(product => res.status(201).json(product))
            .catch(error => this.handleError(error, res))

    }


    getProduct = async(req: Request, res: Response) => { 
        const {page = 1, limit = 10 } = req.query
        const [error, paginationDto ] = PagitaionDto.create(+page, +limit)
        if(error) return res.status(400).json({error});

        this.productService.getProducts(paginationDto!)
            .then(product => res.status(201).json(product))
            .catch(error => this.handleError(error, res))
    }


}