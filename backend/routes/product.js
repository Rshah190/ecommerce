import express from 'express';
import ProductController from '../controllers/ProductController.js';

const router=express.Router();



router.get('/products',ProductController.getAllproducts);
router.post('/add/product',ProductController.createProduct);
router.put('/update/product/:id',ProductController.updateProduct);
router.delete('/delete/product/:id',ProductController.deleteProduct);
router.get('/product/details/:id',ProductController.productDetails);

export default router;