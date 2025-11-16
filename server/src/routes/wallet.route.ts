// inisialisasi route
import { Router } from "express";
import { WalletController } from "../controllers/wallet.controller";
import AuthMiddleware from "../middlewares/auth";

// initialize router
const walletRoute: Router = Router();

// read all
walletRoute.get("/read-all", WalletController.readAll);

// read by email
walletRoute.get(
  "/read-by-email",
  AuthMiddleware("customer"),
  WalletController.readByEmail
);

// export
export default walletRoute;
