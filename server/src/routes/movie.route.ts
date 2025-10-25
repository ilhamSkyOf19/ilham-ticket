import { Router } from "express";
import { MovieController } from "../controllers/movie.controller";
import { FileService } from "../services/file..service";


// initialize router 
const movieRoute: Router = Router();


// create 
movieRoute.post('/create', FileService.upload('thumbnails', 'thumbnail'), MovieController.create);

// read
movieRoute.get('/read', MovieController.read);


// read detail 
movieRoute.get('/read-detail/:id', MovieController.readDetail);


// update 
movieRoute.patch('/update/:id', FileService.upload('thumbnails', 'thumbnail'), MovieController.upadte);


// delete 
movieRoute.delete('/delete/:id', MovieController.delete);

// export 
export default movieRoute;