import ErrorHandler from '../utils/errorhandler.js';

const errorFunction= (err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || 'Internal Server Error';


    // handle mongodb id error or cast error

    if(err.name =='CastError')
    {
        const message=`Resource not Found:Invalid ${err.path}`;
        err=new ErrorHandler(message,404);
    }

    res.status(err.statusCode).json({
        success:false, 
        message:err.message,
        error:err,
        full_error:err.stack,
    })


}

export default errorFunction;