import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
    },
    available: { 
        type: Boolean, 
        default: false, 
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


export const CategoryModel = mongoose.model('Category', categorySchema)