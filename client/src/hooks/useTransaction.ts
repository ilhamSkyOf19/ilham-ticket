import { TransactionService } from "../services/transaction.service";

// transaction wallet
export const useTransactionWallet = async (total: number) => {
  try {
    // call service
    const response = await TransactionService.topUpWallet(total);

    // cek response
    if (!response) return;

    // return response
    return response;
  } catch (error) {
    // cek error
    console.log(error);
  }
};

// read transaction wallet by user
export const useReadTransactionWalletByUser = async () => {
  try {
    // call service
    const response = await TransactionService.readTransactionWalletByUser();

    // cek response
    if (!response) return;

    // return response
    return response;
  } catch (error) {
    // cek error
    console.log(error);
  }
};
