const User = require("../models/userModel");
const asynchandler = require("../utils/asynchandler");
const ErrorHandler = require("../utils/errorhandler");
const jwt = require('jsonwebtoken');

exports.isAuthenticatedUser = asynchandler(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("User not authenticated",401))
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decodedData.id);
    next();
})

exports.authorizedRoles = (...roles) =>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403)) 
        }
        next();
    }
}