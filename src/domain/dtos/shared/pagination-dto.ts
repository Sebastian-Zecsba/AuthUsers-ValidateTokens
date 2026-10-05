export class PagitaionDto{ 

    private constructor(
        public readonly page: number,
        public readonly limit: number
    ){}


    static create(page: number = 1, limit: number = 10  ) :[string?, PagitaionDto?] { 

        if(isNaN(page) || isNaN(limit)) return ['Page and limit must be a numberss']
        if(page <= 0 ) return ['Page must be a greate than 0']
        if(limit <= 0) return ['Limit must be a geater than 0']

        return [undefined, new PagitaionDto(page, limit)]
    }

}