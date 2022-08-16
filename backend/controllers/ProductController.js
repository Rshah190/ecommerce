import Product from "../models/ProductModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncFunction from "../middleware/catchAsyncError.js";
import ApiFeatures from "../utils/apifeatures.js";

class ProductController {
  // create Product
  static createProduct = catchAsyncFunction(async (req, res, next) => {
    req.body.user = req.user.id;
    const document = new Product(req.body);
    const product_response = await document.save();
    res.status(201).json({
      status: 200,
      success: true,
      product_response,
    });
  });

  // get all products
  static getAllproducts = catchAsyncFunction(async (req, res,next) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    const apifeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    // const products= await Product.find();
    const products = await apifeatures.query;

    res.status(200).json({
      products,
      productsCount,
      message: "Product  list fetch Successfully",
    });
  });

  //update Product
  static updateProduct = catchAsyncFunction(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    //check product is exits or not
    if (!product) {
      // return res.status(204).json({
      //     success:false,
      //     mssage:'Product Not found',

      // });
      return next(new ErrorHandler("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      product,
    });
  });

  //delete Product
  static deleteProduct = catchAsyncFunction(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    //check product is exits or not
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    await product.remove();
    res.status(200).json({
      success: true,
      message: "Product is deleted",
    });
  });

  //product details
  static productDetails = catchAsyncFunction(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    //check product is exits or not
    if (!product) {
      //  res.status(200).json({
      //     success:false,
      //     mssage:'Product Not found',

      // });
      return next(new ErrorHandler("Product not found", 404));
    } else {
      res.status(200).json({
        success: true,
        message: "product details fetch Successfully!",
        product,
      });
    }
  });

  /********Create product review and update review****** */
  static createOrUpdateProductReview = catchAsyncFunction(
    async (req, res, next) => {
      const { rating, comment, productId } = req.body;
      const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      };
      const product = await Product.findById(productId);
      const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user.toString() === req.user._id.toString())
            (rev.rating = rating), (rev.comment = comment);
        });
      } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
      });
    }
  );
  /********************get Product All reviews******* */
  static getProductAllreviews = catchAsyncFunction(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });
  /*************delete Product review ********************* */
  static deleteProductReview = catchAsyncFunction(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
      avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
    });
  });
}
export default ProductController;
