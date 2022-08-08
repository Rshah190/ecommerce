import express from 'express';
import ProductController from '../controllers/ProductController.js';
import AuthMiddleware from '../middleware/auth.js';
const router=express.Router();


const auth_middleware=AuthMiddleware.isAuthentcatedUser;
// pass admin role 
const authorized_roles=AuthMiddleware.authorizedRoles('admin');



router.get('/products',auth_middleware,authorized_roles,ProductController.getAllproducts);
router.post('/add/product',auth_middleware,ProductController.createProduct);
router.put('/update/product/:id',auth_middleware,ProductController.updateProduct);
router.delete('/delete/product/:id',auth_middleware,ProductController.deleteProduct);
router.get('/product/details/:id',auth_middleware,ProductController.productDetails);

export default router;