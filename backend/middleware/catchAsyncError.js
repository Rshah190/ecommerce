const catchAsyncFunction=(req,res,next)=>{
    Promise.resolve(catchAsyncFunction(req,res,next)).catch(next);
}


 export default  catchAsyncFunction;