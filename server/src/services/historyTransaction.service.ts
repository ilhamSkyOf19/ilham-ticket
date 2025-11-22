import { prisma } from "../lib/prisma";
import {
  HistoryTransactionType,
  toHistoryTransactionWithPaginationResponse,
} from "../models/historyTransaction-model";

export class HistoryTransactionService {
  // read all by email
  static async readAll(
    userId: number,
    email: string,
    page: number,
    limit: number
  ): Promise<HistoryTransactionType | null> {
    // get transaction ticket by email
    const transactionTicket = await prisma.transactionTicket.findMany({
      where: {
        userId: userId,
      },
      select: {
        total: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        type: true,
        movie: {
          select: {
            title: true,
            url_thumbnail: true,
          },
        },
      },
    });

    // get transaction wallet by email
    const transactionWallet = await prisma.transactionWallet.findMany({
      where: {
        userEmail: email,
      },
      select: {
        type: true,
        total: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // concat
    const response = [
      ...transactionWallet,
      ...transactionTicket.map((item) => ({
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        status: item.status,
        type: item.type,
        url_thumbnail: item.movie.url_thumbnail,
        name: item.movie.title,
        total: item.total,
      })),
    ];

    // sort
    response.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginated = response.slice(start, end);

    // return
    return toHistoryTransactionWithPaginationResponse({
      transaction: paginated,
      totalItems: response.length,
      totalPages: Math.ceil(response.length / limit),
      currentPage: page,
      pageSize: limit,
    });
  }
}
