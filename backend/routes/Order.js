import express from "express";
import OrderController from "../controllers/OrderController.js";
import AuthMiddleware from "../middleware/auth.js";
const router = express.Router();

const auth_middleware = AuthMiddleware.isAuthentcatedUser;
const authorized_roles = AuthMiddleware.authorizedRoles("admin");


router.post('/create',auth_middleware,OrderController.createOrder);
router.get('/details/:id',auth_middleware,OrderController.getSingleOrder);

router.get('/single/list',auth_middleware,OrderController.getAllMyOrders);
router.get('/all/list',auth_middleware,authorized_roles,OrderController.getAllOrdersByAdmin);
router.put('/update/status/:id',auth_middleware,authorized_roles,OrderController.updateOrderStatus);
router.get('/delete',auth_middleware,authorized_roles,OrderController.deleteOrder);










export default router;
