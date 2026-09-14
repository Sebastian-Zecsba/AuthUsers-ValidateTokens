// const mongoose = require('mongoose');
import mongoose from 'mongoose';

interface Options {
    mongoUrl: string,
    dbName: string
}

export class MongoDatabase{
    static async connect(options: Options){
        const { mongoUrl, dbName} = options

        try {

            await mongoose.connect(mongoUrl, {
                dbName: dbName
            })

            console.log("Conected")
            return true
            
        } catch (error) {
            console.log("Conecction falided")
            throw error
        }
    }
}