export class CreateProductDto { 

    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string, // ID
        public readonly category: string, //ID
    ){}


    static create( object: { [key:string]: any}) : [string?,  CreateProductDto?] { 

        const { name, available, price, description, user, category} = object

        if(!name) return ['Mising name']
        if(!user) return ['Mising user']
        if(!category) return ['Mising category']

        return [undefined, new CreateProductDto(name, !!available, price, description, user, category)]
    }

}