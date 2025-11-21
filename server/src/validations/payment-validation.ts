import z, { ZodType } from "zod";
import { WalletCreateType } from "../models/wallet-model";
import { TransactionTicketCreateType } from "../models/transactionTicket-model";

export class PaymentValidation {
  // create
  static readonly WALLET_TRANSACTION = z
    .object({
      balance: z.number("balance is required"),
      type: z.enum(["wallet", "ticket"], "type is required"),
    })
    .strict() as ZodType<WalletCreateType>;

  // ticket transaction
  static readonly TICKET_TRANSACTION = z
    .object({
      movieId: z.number("movieId is required"),
      theaterId: z.number("theaterId is required"),
      time: z.string("time is required"),
      seats: z.array(z.number("seats is required"), "seats is required"),
    })
    .strict() as ZodType<
    Omit<TransactionTicketCreateType, "userId" | "type" | "total">
  >;
}
