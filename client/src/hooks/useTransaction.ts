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

// read transaction ticket by id
export const useReadDetailTransactionTicket = async (id: number) => {
  try {
    // call response
    const response = await TransactionService.readDetail(id);

    // cek response
    if (!response) return;

    // return response
    return response;
  } catch (error) {
    console.log(error);
  }
};
