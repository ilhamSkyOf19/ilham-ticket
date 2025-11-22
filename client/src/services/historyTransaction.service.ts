import api from "../lib/axios";
import type { HistoryTransactionType } from "../models/historyTransaction-model";
import type { ResponseType } from "../types/types";

export class HistoryTransactionService {
  // read all
  static async readAll(
    page: number,
    limit: number
  ): Promise<ResponseType<HistoryTransactionType | null>> {
    // call api
    const response = await api
      .get(`/history-transaction/read-all`, {
        params: {
          page,
          limit,
        },
      })
      .then((res) => res.data);

    // return response data
    return response;
  }
}
