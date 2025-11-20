import { Router } from "express";
import { BookedController } from "../controllers/booked.controller";

// route booked
const bookedRoute: Router = Router();

// get booked by movie id
bookedRoute.get(
  "/read-by-movie-times/:id/:times",
  BookedController.getTimesByMovieId
);

// export
export default bookedRoute;
