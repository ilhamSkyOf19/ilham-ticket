import { TransactionTicket } from "../../generated/prisma";

export type TransactionTicketCreateType = {
  userId: number;
  theaterId: number;
  movieId: number;
  time: string;
  seats: number[];
  total: number;
};

// response
export type TransactionTicketResponseType = {
  id: number;
  userId: number;
  theaterId: number;
  movieId: number;
  time: string;
  seats: number[];
  total: number;
  status: "success" | "pending" | "failed";
  type: "plus" | "min";
  createdAt: Date;
  updatedAt: Date;
};

// to response
export const toTransactionTicketResponse = (
  transactionTicket: Omit<TransactionTicket, "seats"> & {
    seats: number[];
  }
): TransactionTicketResponseType => {
  return {
    id: transactionTicket.id,
    type: transactionTicket.type,
    userId: transactionTicket.userId,
    theaterId: transactionTicket.theaterId,
    movieId: transactionTicket.movieId,
    time: transactionTicket.time,
    seats: transactionTicket.seats,
    total: transactionTicket.total,
    status: transactionTicket.status,
    createdAt: transactionTicket.createdAt,
    updatedAt: transactionTicket.updatedAt,
  };
};

export type TransactionTicketWithPaginationResponseType = {
  transaction: TransactionTicketResponseType[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};

// to response
export const toTransactionWalletWithPaginationResponse = (transactionTicket: {
  transaction: TransactionTicketResponseType[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}): TransactionTicketWithPaginationResponseType => {
  return {
    transaction: transactionTicket.transaction,
    totalItems: transactionTicket.totalItems,
    totalPages: transactionTicket.totalPages,
    currentPage: transactionTicket.currentPage,
    pageSize: transactionTicket.pageSize,
  };
};
