import { bcryptAdapter } from "../../config/bcrypt.js";
import { envs } from "../../config/envs.js";
import { JwtAdapter } from "../../config/jwt.adapter.js";
import { UserModel } from "../../data/index.js";
import { CustomError, LoginUserDto, UserEntity, type RegisterUserDto } from "../../domain/index.js";
import type { EmailService } from "./email.service.js";

export class AuthService{ 

    constructor(
        // DI - Email Service
        private readonly emailService: EmailService
    ){}


    public async registerUser(registerUserDto: RegisterUserDto){ 
        const existUser = await UserModel.findOne({email: registerUserDto.email});
        if(existUser) throw CustomError.badReques('Email already exist');


        try {
            const user = new UserModel(registerUserDto)
            
            // Encriptar la contraseña
            user.password = bcryptAdapter.hash(registerUserDto.password)            
            
            await user.save()

            // JWT <--------- autenticacion de usuario

            const token = await JwtAdapter.generateToken({id: user.id})
            if(!token) throw CustomError.internalServer('Erro while creating TOKEN')

            // Email de confirmacion
            this.sendEmailValitacion(user.email);


            const { password, ...userEntity} = UserEntity.fromObejet(user);

            return {
                user: userEntity, 
                token: token
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

            const token = await JwtAdapter.generateToken({id: user.id})
            if(!token) throw CustomError.internalServer('Erro while creating TOKEN')
            

            return { 
                user: userEntity,
                token: token
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

    private sendEmailValitacion = async ( email: string) => { 

        const token = await JwtAdapter.generateToken({email: email})        
        if(!token) throw CustomError.internalServer('Error getting token')

        // const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`
        const link = `https://app.zecsba.online/api/auth/validate-email/${token}`

        const html = `
            <h1> Validate your email </h1>
            <p>Click on the following link to validate your email</p>
            <a href="${link}">Validate your email: ${email}</a>
        `;

        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html,
        }

        const isSent = await this.emailService.sendEmail(options)
  
        if(!isSent) throw CustomError.internalServer('Error sending email')

        return true
    }


    public validateEmail = async(token: string) => { 
     
        const payload = await JwtAdapter.valideToken(token);
        if(!payload) throw CustomError.unauthorized('Token not valid')

        const { email } = payload as { email: string};
        if(!email) throw CustomError.internalServer('Email not in token');

        const user = await UserModel.findOne({email: email})
        if(!user) throw CustomError.internalServer('Email not exist')

        user.emailValidated = true;
        await user.save();

        return true;

    }

}