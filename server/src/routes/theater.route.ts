import express, { Router } from "express";
import validation from "../middlewares/validation";
import { TheaterCreateType, TheaterUpdateType } from "../models/theater-model";
import { TheaterValidation } from "../validations/theater-validation";
import { TheaterController } from "../controllers/theater.controller";
import AuthMiddleware from "../middlewares/auth";
import { FileService } from "../services/file.service";

// initialize router
const theaterRoute: Router = Router();

// read
theaterRoute.get("/read", TheaterController.read);

// read by id
theaterRoute.get("/read-detail/:id", TheaterController.readDetail);

// read with movie
theaterRoute.get(
  "/read-with-movie/:id",
  TheaterController.readTheatersWithMovie
);

// auth middleware
theaterRoute.use(AuthMiddleware("admin"));

// create
theaterRoute.post(
  "/create",
  FileService.upload("theaters", "img"),
  TheaterController.create
);

// update
theaterRoute.patch(
  "/update/:id",
  FileService.upload("theaters", "img"),
  TheaterController.update
);

// delete
theaterRoute.delete("/delete/:id", TheaterController.delete);

// export router
export default theaterRoute;
