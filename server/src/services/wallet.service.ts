import { expiredBalance } from "../helpers/expired-balance";
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
  static async readById(id: number): Promise<WalletResponseType | null> {
    // get response
    const response = await prisma.wallet.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    const expiredValue = expiredBalance(response.balance, response.updatedAt);

    // return

    return toWalletResponse({
      ...response,
      name: response.user.name,
      expired: expiredValue,
    });
  }

  // update
  static async update(
    id: number,
    req: Omit<WalletCreateType, "type">
  ): Promise<WalletResponseType | null> {
    // get response
    const response = await prisma.wallet.update({
      where: {
        id,
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
      const expiredValue = expiredBalance(res.balance, res.updatedAt);

      return toWalletResponse({
        ...res,
        name: res.user.name,
        expired: expiredValue,
      });
    });
  }
}
