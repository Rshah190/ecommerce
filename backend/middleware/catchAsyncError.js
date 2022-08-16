const catchAsyncFunction = (catchError) => (req, res, next) => {
  Promise.resolve(catchError(req, res, next)).catch(next);
};
export default catchAsyncFunction;
