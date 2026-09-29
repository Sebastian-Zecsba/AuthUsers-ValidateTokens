import jwt, {type SignOptions} from 'jsonwebtoken'
import { envs } from './envs.js';

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {

    // DI? 

    static async generateToken(payload: any, duration: string = "2h"){
        return new Promise((resolve) => { 
            jwt.sign(payload, JWT_SEED, {expiresIn: duration} as SignOptions, (err, token)  => { 

                if(err) return resolve(null)

                resolve(token)
            })
        });
    }

    static valideToken(token: string){
        throw new Error('Not implemented');

        return;
    }
}