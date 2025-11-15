import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/request-auth";
import MidtransClient from "midtrans-client";
import { ResponseType } from "../types/request-response-type";
import { WalletCreateType } from "../models/wallet-model";
import { TransactionWalletService } from "../services/transactionWallet.service";

export const createPayment = async (
  req: AuthRequest<{}, {}, WalletCreateType>,
  res: Response<ResponseType<string | null>>,
  next: NextFunction
) => {
  try {
    // get body
    const { balance, type } = req.body;

    // get req
    const { email } = req?.data ?? { email: "" };

    // create transaction wallet
    const transactionWallet = await TransactionWalletService.create({
      total: balance,
      email: email,
    });

    // snap
    const snap = new MidtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY as string,
      clientKey: process.env.MIDTRANS_CLIENT_KEY as string,
    });

    // params
    const parameter = {
      transaction_details: {
        order_id: `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        gross_amount: balance,
      },
      customer_details: {
        email: email,
      },
      custom_field1: email,
      custom_field2: type,
      custom_field3: transactionWallet?.id,
    };

    // transaction
    const transaction = await snap.createTransaction(parameter);

    // return
    return res.status(200).json({
      status: "success",
      message: "berhasil membuat transaksi",
      data: transaction.redirect_url,
    });
  } catch (error) {
    console.log(error);
    // next error
    next(error);
  }
};
