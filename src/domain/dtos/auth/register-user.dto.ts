import { regularExps } from "../../../config/regular-exp.js";

export class RegisterUserDto{ 

    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ){}

    static create (objet: {[key:string]:any}): [string?, RegisterUserDto?]{ 
        const { name, email, password} = objet

        if(!name) return ['Misiing name'];
        if(!email) return ['Misiing email'];
        if(!regularExps.email.test(email)) return ['Email is no valid'];
        if(!password) return ['Misiing email'];
        if(password.length < 6) return ['Pasword is to short'];

        return [undefined, new RegisterUserDto(name, email, password)]
    }

}