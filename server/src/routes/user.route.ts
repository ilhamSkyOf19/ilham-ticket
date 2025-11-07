import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { FileService } from "../services/file.service";


// initialize router 
const userRoute: Router = Router();


// read 
userRoute.get('/read', UserController.read);


// read detail
userRoute.get('/read-detail/:id', UserController.readDetail);


// update 
userRoute.patch('/update/:id', FileService.upload('avatars', 'avatar'), UserController.update);


// delete 
userRoute.delete('/delete/:id', UserController.delete);


// export 
export default userRoute;