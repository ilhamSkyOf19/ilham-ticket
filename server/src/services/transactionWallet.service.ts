import { prisma } from "../lib/prisma";
import {
  toTransactionWalletResponse,
  TransactionWalletCreateType,
  TransactionWalletResponseType,
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
            email: data.email,
          },
        },
      },
    });

    // return response
    return toTransactionWalletResponse(response);
  }

  //   read by email
  static async readByUseremail(email: string): Promise<any> {
    // get response
    const response = await prisma.transactionWallet.findMany({
      where: {
        userEmail: email,
      },
    });

    // return response
    return response.map(toTransactionWalletResponse);
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
