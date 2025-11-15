// route
import { Router } from "express";
import { TransactionWalletController } from "../controllers/transactionWallet.controller";
import AuthMiddleware from "../middlewares/auth";

// initialize router
const transactionWalletRoute: Router = Router();

// read by user id
transactionWalletRoute.get(
  "/read-by-user",
  AuthMiddleware("customer"),
  TransactionWalletController.readByUserEmail
);

// export
export default transactionWalletRoute;
