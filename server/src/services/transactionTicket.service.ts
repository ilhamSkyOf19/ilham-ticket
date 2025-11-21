import { prisma } from "../lib/prisma";
import {
  toTransactionTicketResponse,
  TransactionTicketCreateType,
  TransactionTicketResponseType,
} from "../models/transactionTicket-model";

export class TransactionTicketService {
  // payment
  static async payment(
    req: TransactionTicketCreateType
  ): Promise<TransactionTicketResponseType | null> {
    // get response
    const response = await prisma.transactionTicket.create({
      data: {
        total: req.total,
        seats: JSON.stringify(req.seats),
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
      seats: JSON.parse(response.seats),
      time: response.time,
      movieId: response.movie.id,
      theaterId: response.theater.id,
      userId: response.user.id,
    });
  }

  // read by email user id
  static async readByUserId(
    userId: number
  ): Promise<TransactionTicketResponseType[] | null> {
    // get response
    const response = await prisma.transactionTicket.findMany({
      where: {
        userId: userId,
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
    return response.map((item) => {
      return toTransactionTicketResponse({
        ...item,
        seats: JSON.parse(item.seats),
        time: item.time,
        movieId: item.movie.id,
        theaterId: item.theater.id,
        userId: item.user.id,
      });
    });
  }
}
