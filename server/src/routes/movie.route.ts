import { Router } from "express";
import { MovieController } from "../controllers/movie.controller";
import { FileService } from "../services/file.service";
import AuthMiddleware from "../middlewares/auth";
import validation from "../middlewares/validation";
import { MovieValidation } from "../validations/movie-validation";
import { BookedCreateType } from "../models/booked-model";

// initialize router
const movieRoute: Router = Router();

// read
movieRoute.get("/read", MovieController.read);

// read detail
movieRoute.get("/read-detail/:id", MovieController.readDetail);

// auth middleware
movieRoute.use(AuthMiddleware("admin"));

// create
movieRoute.post(
  "/create",
  FileService.upload("thumbnails", "thumbnail"),
  MovieController.create
);

// update
movieRoute.patch(
  "/update/:id",
  FileService.upload("thumbnails", "thumbnail"),
  MovieController.update
);

// seats booked
movieRoute.post(
  "/seats-booked/:id",
  AuthMiddleware("admin"),
  validation<Omit<BookedCreateType, "movieId">>(MovieValidation.SEATS_BOOKED),
  MovieController.updateSeatsBooked
);

// check booked
movieRoute.get("/check-booked", MovieController.checkBooked);

// delete
movieRoute.delete("/delete/:id", MovieController.delete);

// export
export default movieRoute;
