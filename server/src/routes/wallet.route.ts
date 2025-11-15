// inisialisasi route
import { Router } from "express";
import { WalletController } from "../controllers/wallet.controller";

// initialize router
const walletRoute: Router = Router();

// read all
walletRoute.get("/read-all", WalletController.readAll);

// export
export default walletRoute;
