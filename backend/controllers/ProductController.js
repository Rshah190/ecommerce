import  Product from'../models/ProductModel.js';
import ErrorHandler from '../utils/errorhandler.js';
import catchAsyncFunction from '../middleware/catchAsyncError.js';
import ApiFeatures from '../utils/apifeatures.js';

class ProductController{

    // create Product
    static createProduct  = catchAsyncFunction(async (req,res,next) =>{

        req.body.user=req.user.id;
        const document = new Product(req.body);
        const product_response = await document.save();
        res.status(201).json({
            status:200,
            success:true,
            product_response
        });
    });

    // get all products
    static getAllproducts= catchAsyncFunction(async(req,res)=>{

       const resultPerPage= 5;
       const productCount = await Product.countDocuments();
       const apifeatures= new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
        // const products= await Product.find();
        const products= await apifeatures.query;

        res.status(200).json({products,productCount,message:"Product  list fetch Successfully"});
    });

    //update Product
    static updateProduct = catchAsyncFunction(async(req,res,next)=>{
        let  product= await Product.findById(req.params.id);
        //check product is exits or not
        if(!product)
        {
            // return res.status(204).json({
            //     success:false,
            //     mssage:'Product Not found',

            // });
            return next(new ErrorHandler('Product not found',404));
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });

        res.status(200).json({
            success:true,
            product
        })
    });

    //delete Product
    static deleteProduct = catchAsyncFunction(async(req,res,next)=>{
        let  product= await Product.findById(req.params.id)
        //check product is exits or not
        if(!product)
        {
            return next(new ErrorHandler('Product not found',404));
        }

        await product.remove();
        res.status(200).json({
            success:true,
            message:'Product is deleted'

        })
    });
    
    //product details 
    static productDetails= catchAsyncFunction(async (req,res,next)=>{
        let  product= await Product.findById(req.params.id)
        //check product is exits or not
        if(!product)
        {
            //  res.status(200).json({
            //     success:false,
            //     mssage:'Product Not found',

            // });
            return next(new ErrorHandler('Product not found',404));

        }
        else{
            res.status(200).json({
                success:true,
                message:'product details fetch Successfully!',
                product
            })
        }

    });
}
export default ProductController;
