import { Router } from "express";
import validation from "../middlewares/validation";
import { LoginRequest } from "../models/auth-model";
import { AuthValidation } from "../validations/auth-validation";
import { AuthController } from "../controllers/auth.controller";
import { UserCreateType } from "../models/user-model";
import { UserValidation } from "../validations/user-validation";


// initial router 
const authRouter = Router();


// register 
authRouter.post('/register', validation<Omit<UserCreateType, "avatar">>(UserValidation.CREATE), AuthController.create);


// login 
authRouter.post('/login', validation<LoginRequest>(AuthValidation.LOGIN), AuthController.login);

// export 
export default authRouter;