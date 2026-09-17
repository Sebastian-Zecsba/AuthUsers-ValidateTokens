import { UserModel } from "../../data/index.js";
import { CustomError, type RegisterUserDto } from "../../domain/index.js";

export class AuthService{ 

    constructor(){}


    public async registerUser(registerUserDto: RegisterUserDto){ 
        const existUser = await UserModel.findOne({email: registerUserDto.email});
        if(existUser) throw CustomError.badReques('Email already exist');


        return 'Todo ok'


    }

}