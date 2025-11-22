// type history transaction
export type HistoryType = {
  name?: string;
  url_thumbnail?: string;
  total: number;
  type: "min" | "plus";
  status: "success" | "pending" | "failed";
  createdAt: Date;
  updatedAt: Date;
};

// read wallet by email

export type HistoryTransactionType = {
  transaction: HistoryType[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};

// to response
export const toHistoryTransactionWithPaginationResponse = (historyTransaction: {
  transaction: HistoryType[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}): HistoryTransactionType => {
  return {
    transaction: historyTransaction.transaction,
    totalItems: historyTransaction.totalItems,
    totalPages: historyTransaction.totalPages,
    currentPage: historyTransaction.currentPage,
    pageSize: historyTransaction.pageSize,
  };
};
