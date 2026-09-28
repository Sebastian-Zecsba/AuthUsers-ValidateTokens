import jwt, {type SignOptions} from 'jsonwebtoken'


export class JwtAdapter {

    // DI? 

    static async generateToken(payload: any, duration: string = "2h"){
        return new Promise((resolve) => { 
            jwt.sign(payload, "SEED", {expiresIn: duration} as SignOptions, (err, token)  => { 

                if(err) return resolve(null)

                resolve(token)
            })
        });
    }

    static valideToken(token: string){


        return 
    }
}