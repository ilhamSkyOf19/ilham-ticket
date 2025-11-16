import api from "../lib/axios";
import type { TransactionWalletResponseType } from "../models/transactionWallet-model";
import type { ResponseType } from "../types/types";

export class TransactionService {
  // top up wallet
  static async topUpWallet(
    balance: number
  ): Promise<ResponseType<{ token: string; redirect_url: string } | null>> {
    // call api
    const response = await api
      .post(`/transaction/wallet`, { balance, type: "wallet" })
      .then((res) => res.data);

    //  return response data
    return response;
  }

  //   read transaction wallet by user
  static async readTransactionWalletByUser(): Promise<
    ResponseType<TransactionWalletResponseType[] | null>
  > {
    // call api
    const response = await api
      .get(`/transaction-wallet/read-by-user`)
      .then((res) => res.data);

    //  return response data
    return response;
  }
}
