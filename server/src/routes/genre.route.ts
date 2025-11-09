import express, { Router } from "express";
import validation from "../middlewares/validation";
import { GenreValidation } from "../validations/genre-validation";
import { GenreCreateType, GenreUpdateType } from "../models/genre-model";
import { GenreController } from "../controllers/genre.controller";
import AuthMiddleware from "../middlewares/auth";

// initialize router
const genreRoute: Router = express.Router();




// read
genreRoute.get('/read', GenreController.read);


// read by id 
genreRoute.get('/read-detail/:id', GenreController.readDetail);


// auth middleware 
genreRoute.use(AuthMiddleware('admin'));

// create 
genreRoute.post('/create', validation<GenreCreateType>(GenreValidation.CREATE), GenreController.create);

// update 
genreRoute.patch('/update/:id', validation<GenreUpdateType>(GenreValidation.UPDATE), GenreController.update);


// delete 
genreRoute.delete('/delete/:id', GenreController.delete);

// export router
export default genreRoute;