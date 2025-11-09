import { Router } from "express";
import AuthMiddleware from "../middlewares/auth";
import { BonusController } from "../controllers/bonus.controller";
import validation from "../middlewares/validation";
import { BonusCreateType } from "../models/bonus-model";
import { BonusValidation } from "../validations/bonus-validation";


// initialize router 
const bonusRoute: Router = Router();

// read
bonusRoute.get('/read', BonusController.read);


// auth middleware 
bonusRoute.use(AuthMiddleware('admin'));


// create 
bonusRoute.post('/create', validation<BonusCreateType>(BonusValidation.CREATE), BonusController.create);


// delete 
bonusRoute.delete('/delete/:id', BonusController.delete);


// export 
export default bonusRoute;