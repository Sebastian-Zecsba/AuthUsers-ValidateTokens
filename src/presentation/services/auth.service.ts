import { UserModel } from "../../data/index.js";
import { CustomError, UserEntity, type RegisterUserDto } from "../../domain/index.js";

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

            const { password, ...userEntity} = UserEntity.fromObejet(user);

            return {
                user: userEntity, 
                token: 'abc'
            }

            return user
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }


    }

}