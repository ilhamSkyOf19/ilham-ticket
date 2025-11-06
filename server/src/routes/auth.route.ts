import { Router } from "express";
import validation from "../middlewares/validation";
import { LoginRequest } from "../models/auth-model";
import { AuthValidation } from "../validations/auth-validation";
import { AuthController } from "../controllers/auth.controller";


// initial router 
const authRouter = Router();

// login 
authRouter.post('/login', validation<LoginRequest>(AuthValidation.LOGIN), AuthController.login);

// export 
export default authRouter;