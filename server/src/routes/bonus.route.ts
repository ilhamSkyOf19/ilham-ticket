import { Router } from "express";
import AuthMiddleware from "../middlewares/auth";
import { BonusController } from "../controllers/bonus.controller";
import validation from "../middlewares/validation";
import { BonusCreateType, BonusUpdateType } from "../models/bonus-model";
import { BonusValidation } from "../validations/bonus-validation";
import { FileService } from "../services/file.service";


// initialize router 
const bonusRoute: Router = Router();

// read
bonusRoute.get('/read', BonusController.read);

// read detail
bonusRoute.get('/read-detail/:id', BonusController.readDetail);


// auth middleware 
bonusRoute.use(AuthMiddleware('admin'));


// create 
bonusRoute.post('/create', FileService.upload('bonus', 'img'), BonusController.create);


// update 
bonusRoute.patch('/update/:id', FileService.upload('bonus', 'img'), BonusController.update);


// delete 
bonusRoute.delete('/delete/:id', BonusController.delete);


// export 
export default bonusRoute;