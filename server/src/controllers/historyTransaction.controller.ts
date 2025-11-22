import { NextFunction, Response } from "express";
import { HistoryTransactionType } from "../models/historyTransaction-model";
import { AuthRequest } from "../types/request-auth";
import { ResponseType } from "../types/request-response-type";
import { HistoryTransactionService } from "../services/historyTransaction.service";

export class HistoryTransactionController {
  // read all ticket & wallet
  static async readHistoryAll(
    req: AuthRequest<{}, {}, {}, { page: string; limit: string }>,
    res: Response<ResponseType<HistoryTransactionType | null>>,
    next: NextFunction
  ) {
    try {
      // get query
      const { page, limit } = req.query;

      // get id & email from req data
      const { id, email } = req.data ?? { id: 0, email: "" };

      // get data
      const data = await HistoryTransactionService.readAll(
        id,
        email,
        Number(page) || 1,
        Number(limit) || 10
      );

      // return
      return res.status(200).json({
        status: "success",
        message: "berhasil membaca history transaction",
        data: data,
      });
    } catch (error) {
      // next error
      next(error);
    }
  }
}
