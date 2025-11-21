// generate total
export const generateTotal = (
  subTotal: number,
  ppnRate: number,
  discount: number,
  bookingFee: number
): number => {
  // get total ppn
  const ppn = subTotal * (ppnRate / 100);

  // get total
  return Math.round(subTotal + ppn - discount + bookingFee);
};
