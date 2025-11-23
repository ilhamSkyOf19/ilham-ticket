import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";
import AuthMiddleware from "../middlewares/auth";
import validation from "../middlewares/validation";
import { ReviewCreateType } from "../models/review-model";
import { ReviewValidation } from "../validations/review-validation";
import { FileService } from "../services/file.service";

// initialize router
const reviewRoute: Router = Router();

// read where movie id
reviewRoute.get("/read-where-movie/:movieId", ReviewController.readWhereMovie);

// auth middleware
reviewRoute.use(AuthMiddleware("customer"));

// create review
reviewRoute.post("/create", ReviewController.create);

// delete
reviewRoute.delete("/delete/:id", ReviewController.delete);

// export
export default reviewRoute;
