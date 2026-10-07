import { ProductModel } from "../../data/index.js";
import { CustomError, PagitaionDto, type CreateProductDto } from "../../domain/index.js";

export class ProductService{ 

    constructor(){}


    async createProducts(createProductDto: CreateProductDto){ 
        const productExist = await ProductModel.findOne({ name: createProductDto.name}) 
        if(productExist) throw CustomError.badReques('Product already exists')
        
        try {
            
            const product = new ProductModel(productExist)

            await product.save()

            return product;

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async getProducts(paginationDto : PagitaionDto){
    
            const { page, limit} = paginationDto;
    
            try {
    
                // const total = await CategoryModel.countDocuments()
                // const categories = await CategoryModel.find()
                //     .skip((page - 1) * limit)
                //     .limit(limit)
    
                const [total, products ] = await Promise.all([
                    ProductModel.countDocuments(),
                    ProductModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
                    // Todo: Populate
                ])
    
    
                return { 
                    page: page,
                    limit: limit,
                    total: total,
                    next: `/api/products?page=${(page + 1)}&limit=${limit}`,
                    prev: (page - 1 > 0 ) ? `/api/products?page=${(page - 1)}&limit=${limit}` : null,
                    products: products
                }
    
            } catch (error) {
                throw CustomError.internalServer('Internal server error')
            }
        }   
}