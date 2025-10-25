import express, { Router } from 'express';
import validation from '../middlewares/validation';
import { TheaterCreateType, TheaterUpdateType } from '../models/theater-model';
import { TheaterValidation } from '../validations/theater-validation';
import { TheaterController } from '../controllers/theater.controller';


// initialize router 
const theaterRoute: Router = Router();


// create 
theaterRoute.post('/create', validation<TheaterCreateType>(TheaterValidation.CREATE), TheaterController.create);


// read
theaterRoute.get('/read', TheaterController.read);


// read by id 
theaterRoute.get('/read-detail/:id', TheaterController.readDetail);


// update 
theaterRoute.patch('/update/:id', validation<TheaterUpdateType>(TheaterValidation.UPDATE), TheaterController.update);


// delete 
theaterRoute.delete('/delete/:id', TheaterController.delete);


// export router 
export default theaterRoute;
