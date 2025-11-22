import { prisma } from "../lib/prisma";
import {
  toTransactionTicketResponse,
  toTransactionTicketWithPaginationResponse,
  TransactionTicketCreateType,
  TransactionTicketResponseType,
  TransactionTicketWithPaginationResponseType,
} from "../models/transactionTicket-model";
import { toTransactionWalletWithPaginationResponse } from "../models/transactionWallet-model";

export class TransactionTicketService {
  // payment
  static async payment(
    req: TransactionTicketCreateType & {
      id: number;
      ppn: number;
      bookingFee: number;
      discount: number;
      subTotal: number;
      url: string;
    }
  ): Promise<TransactionTicketResponseType | null> {
    // get response
    const response = await prisma.transactionTicket.create({
      data: {
        total: req.total,
        seats: JSON.stringify(req.seats),
        id: req.id,
        movie: {
          connect: {
            id: req.movieId,
          },
        },
        theater: {
          connect: {
            id: req.theaterId,
          },
        },
        user: {
          connect: {
            id: req.userId,
          },
        },
        time: req.time,
        status: "pending",
        type: "min",
        ppn: req.ppn,
        bookingFee: req.bookingFee,
        discount: req.discount,
        subTotal: req.subTotal,
        url: req.url,
      },
      include: {
        movie: {
          select: {
            id: true,
          },
        },
        theater: {
          select: {
            id: true,
          },
        },
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    // return response
    return toTransactionTicketResponse({
      ...response,
      id: response.id.toString(),
      seats: JSON.parse(response.seats),
      time: response.time,
      movieId: response.movie.id,
      theaterId: response.theater.id,
      userId: response.user.id,
    });
  }

  // transaction update
  static async update(
    id: number,
    status: "success" | "pending" | "failed"
  ): Promise<TransactionTicketResponseType | null> {
    // get response
    const response = await prisma.transactionTicket.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
      include: {
        movie: {
          select: {
            id: true,
          },
        },
        theater: {
          select: {
            id: true,
          },
        },
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    // return response
    return toTransactionTicketResponse({
      ...response,
      id: response.id.toString(),
      seats: JSON.parse(response.seats),
      time: response.time,
      movieId: response.movie.id,
      theaterId: response.theater.id,
      userId: response.user.id,
    });
  }

  // read for highlight ticket
  static async readAll(
    userId: number,
    page: number,
    limit: number
  ): Promise<TransactionTicketWithPaginationResponseType | null> {
    // total items for calculating total pages
    const totalItems = await prisma.transactionTicket.count({
      where: {
        userId: userId,
      },
    });

    // get response
    const response = await prisma.transactionTicket.findMany({
      where: {
        userId,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        status: true,
        seats: true,
        time: true,

        movie: {
          select: {
            id: true,
            title: true,
            url_thumbnail: true,
            genre: {
              select: {
                name: true,
              },
            },
          },
        },

        theater: {
          select: {
            id: true,
            name: true,
            city: true,
          },
        },

        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // return response
    return toTransactionTicketWithPaginationResponse({
      transaction: response.map((transaction) => {
        return {
          id: transaction.id.toString(),
          title: transaction.movie.title,
          url_thumbnail: transaction.movie.url_thumbnail,
          status: transaction.status,
          genre: transaction.movie.genre,
          theater: transaction.theater,
          seats: JSON.parse(transaction.seats),
          time: transaction.time,
        };
      }),
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      pageSize: limit,
    });
  }
}
