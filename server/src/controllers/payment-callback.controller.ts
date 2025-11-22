import { Request, Response } from "express";
import { ResponseType } from "../types/request-response-type";
import { WalletService } from "../services/wallet.service";
import { TransactionWalletService } from "../services/transactionWallet.service";
import { TransactionTicketService } from "../services/transactionTicket.service";
import { BookedService } from "../services/booked.service";
import crypto from "crypto";

export const paymentCallback = async (
  req: Request,
  res: Response<ResponseType<null>>
) => {
  try {
    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
    } = req.body;

    const data = req.body;

    // generate signature untuk verifikasi
    const expectedSignature = crypto
      .createHash("sha512")
      .update(
        order_id + status_code + gross_amount + process.env.MIDTRANS_SERVER_KEY
      )
      .digest("hex");

    // cek apakah signature valid
    if (signature_key !== expectedSignature) {
      return res.status(400).json({
        status: "failed",
        message: "invalid signature",
        data: null,
      });
    }

    console.log("callback from midtrans:", req.body);

    // ambil dari custom field

    // id
    const id = Number(data.custom_field1);

    // type
    const type: "wallet" | "ticket" = data.custom_field2;

    // custom id trnasaction
    const idTransaction = Number(data.custom_field3);

    // custom seats
    const seats: number[] = data?.metadata?.seats ?? [];

    // email from customer_details
    const email = data?.customer_details?.email;

    switch (transaction_status) {
      case "capture":
        if (fraud_status === "accept") {
          if (type === "wallet") {
            // cek wallet
            const wallet = await WalletService.readById(id);

            await WalletService.update(id, {
              balance: (wallet?.balance ?? 0) + Number(data.gross_amount),
            });

            await TransactionWalletService.update(idTransaction, "success");
          } else if (type === "ticket") {
            // cek booked
            const booked = await BookedService.getById(id);
            // update seats
            await BookedService.updateSeatsBooked(id, [
              ...(booked?.seatsBooked ?? []),
              ...seats,
            ]);

            // update balance
            await WalletService.balanceMinus(
              email,
              Number(data.gross_amount ?? 0)
            );

            // update transaction ticket
            await TransactionTicketService.update(idTransaction, "success");
          }
        }
        break;

      case "settlement":
        if (type === "wallet") {
          // cek wallet
          const wallet = await WalletService.readById(id);
          await WalletService.update(id, {
            balance: (wallet?.balance ?? 0) + Number(data.gross_amount),
          });

          await TransactionWalletService.update(idTransaction, "success");
        } else if (type === "ticket") {
          // cek booked
          const booked = await BookedService.getById(id);
          // update seats
          await BookedService.updateSeatsBooked(id, [
            ...(booked?.seatsBooked ?? []),
            ...seats,
          ]);

          // update balance
          await WalletService.balanceMinus(
            email,
            Number(data.gross_amount ?? 0)
          );

          // update transaction ticket
          await TransactionTicketService.update(idTransaction, "success");
        }
        break;
      case "pending":
        if (type === "wallet") {
          await TransactionWalletService.update(idTransaction, "pending");
        } else if (type === "ticket") {
          await TransactionTicketService.update(idTransaction, "pending");
        }
        break;

      case "deny":
      case "cancel":
      case "expire":
        if (type === "wallet") {
          await TransactionWalletService.update(idTransaction, "failed");
        } else if (type === "ticket") {
          await TransactionTicketService.update(idTransaction, "failed");
        }
        break;

      default:
        console.log("Unhandled status:", transaction_status);
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
