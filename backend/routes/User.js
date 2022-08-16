import express from "express";
import UserController from "../controllers/UserController.js";
import AuthMiddleware from "../middleware/auth.js";

const router = express.Router();
const auth_middleware = AuthMiddleware.isAuthentcatedUser;
const authorized_roles = AuthMiddleware.authorizedRoles("admin");

router.get("/details", auth_middleware, UserController.userDetails);
router.post("/login", UserController.userLogin);

router.post("/register", UserController.userRegister);

router.post("/forgot/password", UserController.forgotPassword);
router.put("/password/reset/:token", UserController.resetPassword);
router.put("/update/password", auth_middleware, UserController.updatePassword);
router.get("/logout", UserController.userlogout);

router.get(
  "/list",
  auth_middleware,
  authorized_roles,
  UserController.getAllUsers
);
router.get(
  "/admin/details/:id",
  auth_middleware,
  authorized_roles,
  UserController.singleUser
);
router.get(
  "/admin/update/role",
  auth_middleware,
  authorized_roles,
  UserController.updateUserRole
);
router.delete(
  "/admin/delete/:id",
  auth_middleware,
  authorized_roles,
  UserController.deleteUser
);

export default router;
