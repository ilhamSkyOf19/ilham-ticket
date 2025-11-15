import { TransactionWallet } from "../../generated/prisma";

export type TransactionWalletCreateType = {
  email: string;
  total: number;
};

// response
export type TransactionWalletResponseType = {
  id: number;
  email: string;
  total: number;
  status: "success" | "pending" | "failed";
  createdAt: Date;
  updatedAt: Date;
};

// to response
export const toTransactionWalletResponse = (
  transactionWallet: TransactionWallet
): TransactionWalletResponseType => {
  return {
    id: transactionWallet.id,
    email: transactionWallet.userEmail,
    total: transactionWallet.total,
    status: transactionWallet.status,
    createdAt: transactionWallet.createdAt,
    updatedAt: transactionWallet.updatedAt,
  };
};
