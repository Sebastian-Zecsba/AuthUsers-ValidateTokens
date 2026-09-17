import { UserModel } from "../../data/index.js";
import { CustomError, type RegisterUserDto } from "../../domain/index.js";

export class AuthService{ 

    constructor(){}


    public async registerUser(registerUserDto: RegisterUserDto){ 
        const existUser = await UserModel.findOne({email: registerUserDto.email});
        if(existUser) throw CustomError.badReques('Email already exist');


        try {
            const user = new UserModel(registerUserDto)
            await user.save()

            // Encriptar la contraseña

            // JWT <--------- autenticacion de usuario

            // Email de confirmacion

            return user
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }


    }

}