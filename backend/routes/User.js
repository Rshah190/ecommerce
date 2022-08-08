import express from 'express';
import UserController from '../controllers/UserController.js';

const router=express.Router();

router.get('/details',UserController.userDetails);
router.post('/login',UserController.userLogin);

router.post('/register',UserController.userRegister);

router.post('/forgot/password',UserController.forgotPassword);
router.put('/password/reset/:token',UserController.resetPassword);

router.get('/logout',UserController.userlogout);



export default router;