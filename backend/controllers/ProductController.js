import  Product from'../models/ProductModel.js';
import ErrorHandler from '../utils/errorhandler.js';
import catchAsyncFunction from '../middleware/catchAsyncError';

class ProductController{

    // create Product
    static createProduct  = async (req,res,next) =>{

        const document = new Product(req.body);
        const product_response = await document.save();
        res.status(201).json({
            status:200,
            success:true,
            product_response
        });
    }

    // get all products
    static getAllproducts= async(req,res)=>{

        const products= await Product.find();

        res.status(200).json({products,message:"Product  list fetch Successfully"});
    }

    //update Product
    static updateProduct = async(req,res,next)=>{
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
    }

    //delete Product
    static deleteProduct = async(req,res,next)=>{
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
    }
    
    //product details 
    static productDetails=async (req,res,next)=>{
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

    }
}
export default ProductController;
