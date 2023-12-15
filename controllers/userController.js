const ErrorHandler = require('../utils/errorhandler')
const asynchandler = require('../utils/asynchandler')
const User = require('../models/userModel');
const sendToken = require('../utils/sendtoken');
const {sendEmail} = require('../utils/sendEmail');

//register a user
exports.registerUser = asynchandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    const userData = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "simple id",
            url: "profilepicurl",
        }
    })

    sendToken(userData,200,res);
})

//user login
exports.loginuser = asynchandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("email and password is required", 400))
    }
    const userData = await User.findOne({ email }).select("+password");
    if (!userData) {
        return next(new ErrorHandler("Invalid email or password"))
    }
    const isPasswordMatch = await userData.validatePassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    sendToken(userData,200,res);
})

//user logout
exports.logoutUser = asynchandler(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })
    res.status(200).json({
        success:true,
        message:"log out successful"
    })
})

//forgot password
exports.forgotPassword = asynchandler(async(req,res,next)=>{
    const userData = await User.findOne({email:req.body.email});
    if(!userData){
        return next(new ErrorHandler("user not found",404))
    }
    //get reset password token
    const resetToken = userData.getResetPasswordToken();
    await userData.save({validateBeforeSave:false});
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then,please ignore it`;

    try {
        await sendEmail({
            email:userData.email,
            subject:`Ecommerce password recovery`,
            message,
        });
        res.status(200).json({
            success:true,
            message:`Password reset link sent to ${userData.email} successfully`
        })
    } catch (error) {
        userData.resetPasswordToken = undefined;
        userData.resetPasswordExpire = undefined;
        await userData.save();
        return next(new ErrorHandler(error.message,500))
    }
})