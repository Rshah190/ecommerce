import  User from'../models/UserModel.js';
import ErrorHandler from '../utils/errorhandler.js';
import catchAsyncFunction from '../middleware/catchAsyncError.js';
import sendToken from '../utils/jwttoken.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

class UserController{

    /**********************register user******************** */
    static userRegister = catchAsyncFunction( async (req,res,next)=>{
        const {name,email,password}=req.body;
      
        const user= await User.create({
            name,
            email,
            password,
            avatar:{
                public_id:'smaple_profile_id',
                url:'sampleurl'
            }
        });
        sendToken(user,201,res);

    });
    static userDetails =catchAsyncFunction( async (req,res,next)=>{
       
        res.status(201).json({
            success:true,
            message:'User details fetch  Successfully',
            
        });

    });
    /****************************login ********* */
    static userLogin=catchAsyncFunction(async (req,res,next)=>{
     const { email,password}=req.body;
     // check if user has  given email and password both
     if(!email || !password){
         return next( new ErrorHandler('Please enter Email and Password',400));    
     } 
     const user = await User.findOne({email}).select("+password");
     if(!user){
        return next( new ErrorHandler('Invalid  Email or Password',401));
     }

     const isPasswordMatched=user.comparePassword(password);

     if(!isPasswordMatched){
        return next( new ErrorHandler('Invalid  Email or Password',401));
     }
     sendToken(user,200,res);
        
    });
    /***************logout***********************/
    static userlogout=catchAsyncFunction(async (req,res,next)=>{
        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true,
                
        });
        res.status(200).json({
            success:true,
            message:'User logout Successfully!',

        })
    });
    /***************forgot password************* */
    static forgotPassword=catchAsyncFunction(async (req,res,next)=>{
     const user = await User.findOne({email:req.body.email});
     if(!user)
     {
        return next(new ErrorHandler('User Not Forund',200));
     }
     const resetPasswordToken=user.getResetPasswordToken();
     await user.save({validateBeforeSave:false});

     const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/user/password/reset/${resetPasswordToken}`;
     const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
     try {
        await sendEmail({
          email: user.email,
          subject: `Ecommerce Password Recovery`,
          message,
        });
    
        res.status(200).json({
          success: true,
          message: `Email sent to ${user.email} successfully`,
        });
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
    
        await user.save({ validateBeforeSave: false });
    
        return next(new ErrorHandler(error.message, 500));
      }

    });

    /**************reset Password*******************/
    static resetPassword=catchAsyncFunction(async (req,res,next)=>{
        // create token hash
        const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user =await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt:Date.now()}
        });

        console.log(user);
        if (!user) {
            return next(
              new ErrorHandler(
                "Reset Password Token is invalid or has been expired",
                400
              )
            );
          }
        
          if (req.body.password !== req.body.confirmPassword) {
            return next(new ErrorHandler("Confirm Password does not match with password", 400));
          }
        
          user.password = req.body.password;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
        //   console.log(user);
          await user.save();
          sendToken(user, 200, res);
    })
    
}

export default UserController;