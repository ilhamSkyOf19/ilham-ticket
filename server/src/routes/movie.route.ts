import { Router } from "express";
import { MovieController } from "../controllers/movie.controller";
import { FileService } from "../services/file..service";


// initialize router 
const movieRoute: Router = Router();


// create 
movieRoute.post('/create', FileService.upload('thumbnails', 'thumbnail'), MovieController.create);


// export 
export default movieRoute;