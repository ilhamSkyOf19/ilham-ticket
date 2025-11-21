import { Router } from "express";
import AuthMiddleware from "../middlewares/auth";
import { TransactionTicketController } from "../controllers/transactionTicket.controller";

// initialize router
const transactionTicketRoute: Router = Router();

// auth middleware
transactionTicketRoute.use(AuthMiddleware("customer"));

// read by id
transactionTicketRoute.get(
  "/read-by-id",
  TransactionTicketController.readByUserId
);

// export
export default transactionTicketRoute;
