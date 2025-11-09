import { Router } from "express";
import AuthMiddleware from "../middlewares/auth";
import { BonusController } from "../controllers/bonus.controller";
import validation from "../middlewares/validation";
import { BonusCreateType } from "../models/bonus-model";
import { BonusValidation } from "../validations/bonus-validation";


// initialize router 
const bonusRoute: Router = Router();


// create 
bonusRoute.post('/create', AuthMiddleware('admin'), validation<BonusCreateType>(BonusValidation.CREATE), BonusController.create);


// read
bonusRoute.get('/read', BonusController.read);

// export 
export default bonusRoute;