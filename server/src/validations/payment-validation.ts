import z, { ZodType } from "zod";
import { WalletCreateType } from "../models/wallet-model";

export class PaymentValidation {
  // create
  static readonly WALLET_TRANSACTION = z
    .object({
      balance: z.number("balance is required"),
      type: z.enum(["wallet", "ticket"], "type is required"),
    })
    .strict() as ZodType<WalletCreateType>;
}
