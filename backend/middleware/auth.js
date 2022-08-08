import  User from'../models/UserModel.js';
import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncFunction from "./catchAsyncError.js";
import jwt from "jsonwebtoken";

class AuthMiddleware{
    static  isAuthentcatedUser= catchAsyncFunction(async (req,res,next)=>{
        const {token} = req.cookies;
        // console.log(token);
        if(!token)
        {
            return next(new ErrorHandler('Please logn to access this resource',400));
        }
        // decode token 
        const decodeData = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decodeData);
        req.user=await User.findById(decodeData.id);
        // console.log(req.user);
        next();
    
    });

    static authorizedRoles=(...roles)=>{
        console.log(roles);
        return (req,res,next)=>{
            if(!roles.includes(req.user.role)){
               return next( new ErrorHandler(
                    `Role:${req.user.role} is not allowed to access`,403
                ));
            }

            next();
        }
    }
}


export default AuthMiddleware;