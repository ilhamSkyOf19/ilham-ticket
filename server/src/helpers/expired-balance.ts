export const expiredBalance = (balance: number, update: Date): string => {
  // cek
  if (balance > 0) {
    const expiredDate = new Date(update);
    expiredDate.setDate(expiredDate.getDate() + 30);

    return expiredDate.toISOString();
  } else {
    return "0";
  }
};
