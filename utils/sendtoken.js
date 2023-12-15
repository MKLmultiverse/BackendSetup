
//creating token and save it in browser cookie
const sendToken = (userData,statusCode,res)=>{
    const token = userData.getJWTToken();
    //cookie options
    const cookieOptions = {
        expires: new Date(Date.now()+process.env.COOKIE_EXPIRES*24*60*60*1000),
        httpOnly:true,
    }
    res.status(statusCode).cookie('token',token,cookieOptions).json({
        success:true,
        userData,
        token
    })
}

module.exports = sendToken;