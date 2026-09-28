import { compareSync, genSaltSync, hashSync } from 'bcryptjs'

export const bcryptAdapter = { 
 
    hash: (password:string) => {
        const salt = genSaltSync();
        return hashSync(password, salt)
    },


    compare: (pasword:string, hash: string) => { 
        return compareSync(pasword, hash)
    }

}