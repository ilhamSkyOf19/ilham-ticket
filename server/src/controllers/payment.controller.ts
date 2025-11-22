import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/request-auth";
import MidtransClient from "midtrans-client";
import { ResponseType } from "../types/request-response-type";
import { WalletCreateType } from "../models/wallet-model";
import { TransactionWalletService } from "../services/transactionWallet.service";

export const createPayment = async (
  req: AuthRequest<{}, {}, WalletCreateType>,
  res: Response<ResponseType<{ token: string; redirect_url: string } | null>>,
  next: NextFunction
) => {
  try {
    // get body
    const { balance, type } = req.body;

    // get req
    const { email, id: userId } = req?.data ?? { email: "", id: 0 };

    // create transaction wallet
    const transactionWallet = await TransactionWalletService.create({
      total: balance,
      userId: userId,
    });

    // auth string
    const midtransAuth = process.env.MIDTRANS_AUTH as string;

    // payload
    const payload = {
      transaction_details: {
        order_id: `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        gross_amount: balance,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        email: email,
      },
      metadata: {
        seats: [],
      },
      custom_field1: userId,
      custom_field2: type,
      custom_field3: transactionWallet?.id,
    };

    const response = await fetch(process.env.MIDTRANS_URL as string, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${midtransAuth}`,
      },
      body: JSON.stringify(payload),
    });

    // respon to json
    const data = await response.json();

    // return
    return res.status(200).json({
      status: "success",
      message: "berhasil membuat transaksi",
      data: {
        token: data.token,
        redirect_url: data.redirect_url,
      },
    });
  } catch (error) {
    console.log(error);
    // next error
    next(error);
  }
};
