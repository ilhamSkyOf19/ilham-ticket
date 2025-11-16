export type TransactionWalletCreateType = {
  total: number;
};

// response
export type TransactionWalletResponseType = {
  id: number;
  email: string;
  total: number;
  type: "plus" | "min";
  status: "success" | "pending" | "failed";
  createdAt: Date;
  updatedAt: Date;
};
