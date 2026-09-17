import { regularExps } from "../../../config/regular-exp.js";

export class RegisterUserDto{ 

    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ){}

    static create (object: {[key:string]:any}) : [string?, RegisterUserDto?]{ 
        const { name, email, password } = object

        if(!name) return ['Mising name'];
        if(!email) return ['Mising email'];
        if(!regularExps.email.test(email)) return ['Email is no valid'];
        if(!password) return ['Mising password'];
        if(password.length < 6) return ['Pasword is to short'];

        return [undefined, new RegisterUserDto(name, email, password)]
    }

}