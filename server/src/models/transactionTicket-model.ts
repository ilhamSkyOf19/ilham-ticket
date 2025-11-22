import { TransactionTicket } from "@prisma/client";
import { MovieResponseType } from "./movie-model";
import { GenreResponseType } from "./genre-model";
import { TheaterResponseType } from "./theater-model";

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
  id: string;
  url: string;
  userId: number;
  theaterId: number;
  movieId: number;
  time: string;
  seats: number[];
  ppn: number;
  bookingFee: number;
  discount: number;
  subTotal: number;
  total: number;
  status: "success" | "pending" | "failed";
  type: "plus" | "min";
  createdAt: Date;
  updatedAt: Date;
};

// to response
export const toTransactionTicketResponse = (
  transactionTicket: Omit<TransactionTicket, "seats" | "id"> & {
    seats: number[];
    id: string;
  }
): TransactionTicketResponseType => {
  return {
    id: transactionTicket.id,
    url: transactionTicket.url,
    type: transactionTicket.type,
    userId: transactionTicket.userId,
    theaterId: transactionTicket.theaterId,
    movieId: transactionTicket.movieId,
    time: transactionTicket.time,
    seats: transactionTicket.seats,
    ppn: transactionTicket.ppn,
    bookingFee: transactionTicket.bookingFee,
    discount: transactionTicket.discount,
    subTotal: transactionTicket.subTotal,
    total: transactionTicket.total,
    status: transactionTicket.status,
    createdAt: transactionTicket.createdAt,
    updatedAt: transactionTicket.updatedAt,
  };
};

export type TransactionTicketWithPaginationResponseType = {
  transaction: {
    id: string;
    title: string;
    url_thumbnail: string;
    genre: Pick<GenreResponseType, "name">;
    theater: Pick<TheaterResponseType, "name" | "city">;
    status: "success" | "pending" | "failed";
    time: string;
  }[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};

// to response
export const toTransactionTicketWithPaginationResponse = (
  transactionTicket: TransactionTicketWithPaginationResponseType
): TransactionTicketWithPaginationResponseType => {
  return {
    transaction: transactionTicket.transaction,
    totalItems: transactionTicket.totalItems,
    totalPages: transactionTicket.totalPages,
    currentPage: transactionTicket.currentPage,
    pageSize: transactionTicket.pageSize,
  };
};
