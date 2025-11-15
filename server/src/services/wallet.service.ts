import { prisma } from "../lib/prisma";
import {
  toWalletResponse,
  WalletCreateType,
  WalletResponseType,
} from "../models/wallet-model";

export class WalletService {
  // create
  static async create(
    req: WalletCreateType & { email: string }
  ): Promise<WalletResponseType | null> {
    // get response
    const response = await prisma.wallet.create({
      data: {
        balance: req.balance,
        branch: "BNI",
        user: {
          connect: {
            email: req.email,
          },
        },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // return
    return toWalletResponse({
      ...response,
      name: response.user.name,
      email: response.user.email,
      expired: "0",
    });
  }

  // read by email
  static async readByEmail(email: string): Promise<WalletResponseType | null> {
    // get response
    const response = await prisma.wallet.findFirstOrThrow({
      where: {
        email,
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

  // update
  static async update(
    email: string,
    req: Omit<WalletCreateType, "type">
  ): Promise<WalletResponseType | null> {
    // get response
    const response = await prisma.wallet.update({
      where: {
        email,
      },
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
