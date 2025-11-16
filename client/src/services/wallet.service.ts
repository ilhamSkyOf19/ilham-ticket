import api from "../lib/axios";
import type { WalletResponseType } from "../models/wallet-model";
import type { ResponseType } from "../types/types";

export default class WalletService {
  // read wallet by email
  static async readByEmail(): Promise<ResponseType<WalletResponseType | null>> {
    // call api
    const response = api.get(`/wallet/read-by-email`).then((res) => res.data);

    // return response data
    return response;
  }
}
