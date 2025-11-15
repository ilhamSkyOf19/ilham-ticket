// inisialisasi express
import { Router } from "express";
import { SeatsService } from "../services/seats.service";
import { SeatsController } from "../controllers/seats.controller";

// seat route
const seatRoute: Router = Router();

// read seats by movie
seatRoute.get("/read-by-movie/:id/:time", SeatsController.readByMovieId);

// export
export default seatRoute;
