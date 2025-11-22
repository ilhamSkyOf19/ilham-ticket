// read wallet by email
export type HistoryTransactionType = {
  transaction: {
    name?: string;
    url_thumbnail?: string;
    type: "min" | "plus";
    total: number;
    status: "success" | "pending" | "failed";
    createdAt: Date;
    updatedAt: Date;
  }[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};

// to response
export const toHistoryTransactionWithPaginationResponse = (historyTransaction: {
  transaction: {
    name?: string;
    url_thumbnail?: string;
    total: number;
    type: "min" | "plus";
    status: "success" | "pending" | "failed";
    createdAt: Date;
    updatedAt: Date;
  }[];
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
