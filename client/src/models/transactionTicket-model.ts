export type TransactionTicketCreateType = {
  movieId: number | null;
  theaterId: number | null;
  time: string | null;
  seats: number[];
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
  transactionTicket: TransactionTicketResponseType
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
