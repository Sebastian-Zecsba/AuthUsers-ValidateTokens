import { bcryptAdapter } from "../../config/bcrypt.js";
import { JwtAdapter } from "../../config/jwt.adapter.js";
import { UserModel } from "../../data/index.js";
import { CustomError, LoginUserDto, UserEntity, type RegisterUserDto } from "../../domain/index.js";

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
                token: "abc"
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    public async loginUser(loginUserDto: LoginUserDto){ 
        const user = await UserModel.findOne({email: loginUserDto.email})
        if(!user) throw CustomError.badReques('Email not exist')

        try {
            const isMatch = bcryptAdapter.compare(loginUserDto.password, user.password)     
            if(!isMatch) throw CustomError.badReques(`Password hasnt match`) 

            const { password, ...userEntity } = UserEntity.fromObejet(user)

            const token = await JwtAdapter.generateToken({id: user.id, email: user.email})
            if(!token) throw CustomError.internalServer('Erro while creating TOKEN')
            

            return { 
                user: userEntity,
                token: token
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

        
    }

}