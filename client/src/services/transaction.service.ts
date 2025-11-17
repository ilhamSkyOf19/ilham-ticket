import api from "../lib/axios";
import type {
  TransactionWalletResponseType,
  TransactionWalletWithPaginationResponseType,
} from "../models/transactionWallet-model";
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
  static async readTransactionWalletByUser(
    page: number,
    limit: number
  ): Promise<ResponseType<TransactionWalletWithPaginationResponseType | null>> {
    // call api
    const response = await api
      .get(`/transaction-wallet/read-by-user`, {
        params: {
          page,
          limit,
        },
      })
      .then((res) => res.data);

    //  return response data
    return response;
  }
}
