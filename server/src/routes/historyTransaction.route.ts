import { Router } from "express";
import AuthMiddleware from "../middlewares/auth";
import { HistoryTransactionController } from "../controllers/historyTransaction.controller";

// initialize router
const historyTransactionRoute: Router = Router();

// auth
historyTransactionRoute.use(AuthMiddleware("customer"));

// read all
historyTransactionRoute.get(
  "/read-all",
  HistoryTransactionController.readHistoryAll
);

// export
export default historyTransactionRoute;
