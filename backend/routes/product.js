import express from "express";
import ProductController from "../controllers/ProductController.js";
import AuthMiddleware from "../middleware/auth.js";
const router = express.Router();

const auth_middleware = AuthMiddleware.isAuthentcatedUser;
// pass admin role
const authorized_roles = AuthMiddleware.authorizedRoles("admin");

router.get("/products", ProductController.getAllproducts);

router.get(
  "/product/details/:id",
  auth_middleware,
  ProductController.productDetails
);

router.post("/add/product", auth_middleware, ProductController.createProduct);

router.post(
  "admin/add/product",
  auth_middleware,
  authorized_roles,
  ProductController.createProduct
);
router.put(
  "/update/product/:id",
  auth_middleware,
  authorized_roles,
  ProductController.updateProduct
);
router.delete(
  "/delete/product/:id",
  auth_middleware,
  authorized_roles,
  ProductController.deleteProduct
);

router.put(
  "/product/review",
  auth_middleware,
  ProductController.createOrUpdateProductReview
);

router.get(
  "/product/allReviews",
  auth_middleware,
  ProductController.getProductAllreviews
);
router.delete(
  "/delete/review",
  auth_middleware,
  ProductController.deleteProductReview
);

export default router;
