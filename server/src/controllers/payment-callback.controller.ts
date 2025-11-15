import { Request, Response } from "express";
import { ResponseType } from "../types/request-response-type";
import { WalletService } from "../services/wallet.service";
import { TransactionWalletService } from "../services/transactionWallet.service";

export const paymentCallback = async (
  req: Request,
  res: Response<ResponseType<null>>
) => {
  try {
    const data = req.body;

    console.log("callback from midtrans:", data);

    // status transaksi
    const transactionStatus = data.transaction_status;
    const fraudStatus = data.fraud_status;

    // ambil dari custom field
    const email = data.custom_field1;
    const type = data.custom_field2;
    const idTransactionWallet = Number(data.custom_field3);

    // cek wallet
    const wallet = await WalletService.readByEmail(email);

    switch (transactionStatus) {
      case "capture":
        if (fraudStatus === "accept" && type === "wallet") {
          await WalletService.update(email, {
            balance: (wallet?.balance ?? 0) + Number(data.gross_amount),
          });

          await TransactionWalletService.update(idTransactionWallet, "success");
        }
        break;

      case "settlement":
        if (type === "wallet") {
          await WalletService.update(email, {
            balance: (wallet?.balance ?? 0) + Number(data.gross_amount),
          });

          await TransactionWalletService.update(idTransactionWallet, "success");
        }
        break;

      case "deny":
      case "cancel":
      case "expire":
      case "pending":
        if (type === "wallet") {
          await TransactionWalletService.update(idTransactionWallet, "failed");
        }
        break;

      default:
        console.log("Unhandled status:", transactionStatus);
    }

    return res.status(200).json({
      status: "success",
      message: "success",
      data: null,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: "failed",
      message: "failed",
      data: null,
    });
  }
};
