import { Wallet } from "../../generated/prisma";

// create
export type WalletCreateType = {
  balance: number;
  type: "wallet" | "ticket";
};

// update
export type WalletUpdateType = Partial<WalletCreateType>;

// response
export type WalletResponseType = {
  id: number;
  name: string;
  email: string;
  balance: number;
  expired: Date | string;
  branch: string;
};

// to response
export const toWalletResponse = (
  wallet: Wallet & { expired: Date | string; name: string }
): WalletResponseType => {
  return {
    id: wallet.id,
    name: wallet.name,
    email: wallet.email,
    balance: wallet.balance,
    expired: wallet.expired,
    branch: wallet.branch,
  };
};
