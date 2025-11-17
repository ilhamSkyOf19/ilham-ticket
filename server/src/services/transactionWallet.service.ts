import { prisma } from "../lib/prisma";
import {
  toTransactionWalletResponse,
  toTransactionWalletWithPaginationResponse,
  TransactionWalletCreateType,
  TransactionWalletResponseType,
  TransactionWalletWithPaginationResponseType,
} from "../models/transactionWallet-model";

export class TransactionWalletService {
  // create
  static async create(
    data: TransactionWalletCreateType
  ): Promise<TransactionWalletResponseType | null> {
    // get response
    const response = await prisma.transactionWallet.create({
      data: {
        total: data.total,
        type: "plus",
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });

    // return response
    return toTransactionWalletResponse(response);
  }

  //   read by email
  static async readByUseremail(
    email: string,
    page: number,
    limit: number
  ): Promise<TransactionWalletWithPaginationResponseType | null> {
    // get response
    // total items untuk menghitung total pages
    const totalItems = await prisma.transactionWallet.count({
      where: { userEmail: email },
    });

    // ambil data halaman tertentu
    const transaction = await prisma.transactionWallet.findMany({
      where: { userEmail: email },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" }, // optional: urutkan terbaru dulu
    });

    const totalPages = Math.ceil(totalItems / limit);

    // buat response sesuai type
    const response: TransactionWalletWithPaginationResponseType = {
      transaction: transaction.map((transaction) => {
        return {
          id: transaction.id,
          type: transaction.type,
          email: transaction.userEmail,
          total: transaction.total,
          status: transaction.status,
          createdAt: transaction.createdAt,
          updatedAt: transaction.updatedAt,
        };
      }),
      totalItems,
      totalPages,
      currentPage: page,
      pageSize: limit,
    };

    return toTransactionWalletWithPaginationResponse(response);
  }

  //   update
  static async update(
    id: number,
    status: "success" | "pending" | "failed"
  ): Promise<TransactionWalletResponseType | null> {
    // get response
    const response = await prisma.transactionWallet.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });

    // return response
    return toTransactionWalletResponse(response);
  }
}
