import { bcryptAdapter } from "../../config/bcrypt.js";
import { UserModel } from "../../data/index.js";
import { CustomError, UserEntity, type RegisterUserDto } from "../../domain/index.js";

export class AuthService{ 

    constructor(){}


    public async registerUser(registerUserDto: RegisterUserDto){ 
        const existUser = await UserModel.findOne({email: registerUserDto.email});
        if(existUser) throw CustomError.badReques('Email already exist');


        try {
            const user = new UserModel(registerUserDto)
            
            // Encriptar la contraseña
            user.password = bcryptAdapter.hash(registerUserDto.password)            
            
            await user.save()

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