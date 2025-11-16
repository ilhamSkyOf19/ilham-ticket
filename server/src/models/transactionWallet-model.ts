import { TransactionWallet } from "../../generated/prisma";

export type TransactionWalletCreateType = {
  userId: number;
  total: number;
};

// response
export type TransactionWalletResponseType = {
  id: number;
  email: string;
  total: number;
  status: "success" | "pending" | "failed";
  type: "plus" | "min";
  createdAt: Date;
  updatedAt: Date;
};

// to response
export const toTransactionWalletResponse = (
  transactionWallet: TransactionWallet
): TransactionWalletResponseType => {
  return {
    id: transactionWallet.id,
    type: transactionWallet.type,
    email: transactionWallet.userEmail,
    total: transactionWallet.total,
    status: transactionWallet.status,
    createdAt: transactionWallet.createdAt,
    updatedAt: transactionWallet.updatedAt,
  };
};
