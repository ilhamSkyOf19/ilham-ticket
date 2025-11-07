import { Router } from "express";
import validation from "../middlewares/validation";
import { LoginRequest } from "../models/auth-model";
import { AuthValidation } from "../validations/auth-validation";
import { AuthController } from "../controllers/auth.controller";
import { UserCreateType } from "../models/user-model";
import { UserValidation } from "../validations/user-validation";
import AuthMiddleware from "../middlewares/auth";


// initial router 
const authRouter = Router();



// cek auth 
authRouter.get('/cek-auth-customer', AuthMiddleware('customer'), AuthController.checkAuth);


authRouter.get('/cek-auth-admin', AuthMiddleware('admin'), AuthController.checkAuth);

// signup 
authRouter.post('/signup', validation<Omit<UserCreateType, "avatar">>(UserValidation.CREATE), AuthController.create);


// signin
authRouter.post('/signin', validation<LoginRequest>(AuthValidation.LOGIN), AuthController.login);

// export 
export default authRouter;