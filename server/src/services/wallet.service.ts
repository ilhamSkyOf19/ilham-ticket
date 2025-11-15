import { prisma } from "../lib/prisma";
import {
  toWalletResponse,
  WalletCreateType,
  WalletResponseType,
} from "../models/wallet-model";

export class WalletService {
  // create
  static async create(
    req: WalletCreateType & { userId: number }
  ): Promise<WalletResponseType | null> {
    // get response
    const response = await prisma.wallet.create({
      data: {
        ...req,
        branch: "BNI",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    // return
    return toWalletResponse({
      ...response,
      name: response.user.name,
      expired: "0",
    });
  }

  //   read all
  static async readAll(): Promise<WalletResponseType[] | null> {
    // get response
    const response = await prisma.wallet.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    // expired

    // return
    return response.map((res) => {
      let expiredValue = "0";

      if (res.balance > 0) {
        const updatedDate = new Date(res.updatedAt);
        const expiredDate = new Date(updatedDate);
        expiredDate.setDate(updatedDate.getDate() + 30);

        expiredValue = expiredDate.toISOString();
      }

      return toWalletResponse({
        ...res,
        name: res.user.name,
        expired: expiredValue,
      });
    });
  }
}
