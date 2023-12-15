const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Product name is required"],
        trim:true,
    },
    description:{
        type:String,
        required:[true,"description is required"]
    },
    price:{
        type:Number,
        required:[true,"price is required"],
        maxLength:[8,"price cannot exceed 8 figures"]
    },
    rating:{
        type:Number,
        default:0,
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"category is required"]
    },
    stock:{
        type:Number,
        required:[true,"Product stock is required"],
        maxLength:[4,"Product stock cannot exceed 9999"],
        default:1,
    },
    numOfReviews:[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true,
            }
        }
    ],
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true,
    }
},{timestamps:true})

module.exports = mongoose.model("product",productSchema);