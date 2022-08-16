import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncFunction from "../middleware/catchAsyncError.js";
import ApiFeatures from "../utils/apifeatures.js";

class OrderController {
  /*********new Order********** */
  static createOrder = catchAsyncFunction(async (req, res, next) => {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      order,
      message: "Order Created Successfully!",
    });
  });
  /***********get Single Order******** */
  static getSingleOrder = catchAsyncFunction(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }

    res.status(200).json({
      success: true,
      order,
    });
  });

  /*********************get all my orders*****/
  static getAllMyOrders = catchAsyncFunction(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      orders,
    });
  });

  /******************get ALl orders .. Admin */
  static getAllOrdersByAdmin = catchAsyncFunction(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  });

  /**********update Order Status****************** */
  static updateOrderStatus = catchAsyncFunction(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
      return next(
        new ErrorHandler("You have already delivered this order", 400)
      );
    }

    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });

    updateStock=async(id, quantity)=> {
    const product = await Product.findById(id);
    product.Stock -= quantity;
    await product.save({ validateBeforeSave: false });
  }
  
  // delete Order -- Admin
  static deleteOrder = catchAsyncFunction(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    await order.remove();
  
    res.status(200).json({
      success: true,
    });
  });
}
export default OrderController;
