import { Router } from "express";
import { MovieController } from "../controllers/movie.controller";
import { FileService } from "../services/file.service";
import AuthMiddleware from "../middlewares/auth";


// initialize router 
const movieRoute: Router = Router();



// read
movieRoute.get('/read', MovieController.read);


// read detail 
movieRoute.get('/read-detail/:id', MovieController.readDetail);

// auth middleware 
movieRoute.use(AuthMiddleware('admin'));

// create 
movieRoute.post('/create', FileService.upload('thumbnails', 'thumbnail'), MovieController.create);

// update 
movieRoute.patch('/update/:id', FileService.upload('thumbnails', 'thumbnail'), MovieController.update);


// delete 
movieRoute.delete('/delete/:id', MovieController.delete);

// export 
export default movieRoute;