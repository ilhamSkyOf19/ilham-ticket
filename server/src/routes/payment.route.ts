// inisialisasi router
import { Router } from "express";
import { createPayment } from "../controllers/payment.controller";
import validation from "../middlewares/validation";
import { WalletCreateType } from "../models/wallet-model";
import { PaymentValidation } from "../validations/payment-validation";
import AuthMiddleware from "../middlewares/auth";
import { paymentCallback } from "../controllers/payment-callback.controller";

// initialize router
const paymentRoute: Router = Router();

// callback
paymentRoute.post("/callback", paymentCallback);

// auth middleware
paymentRoute.use(AuthMiddleware("customer"));

// transaction
paymentRoute.post(
  "/wallet",
  validation<WalletCreateType>(PaymentValidation.WALLET_TRANSACTION),
  createPayment
);

// export
export default paymentRoute;
