import WalletService from "../services/wallet.service";

// read wallet by email
export const useReadWalletByEmail = async () => {
  try {
    // get service
    const response = await WalletService.readByEmail();

    // cek response
    if (!response) return;
    // return
    return response;
  } catch (error) {
    // cek error
    console.log(error);
  }
};
