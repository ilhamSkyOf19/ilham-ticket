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
}
