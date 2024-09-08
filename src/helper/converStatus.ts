export const convertStatus = (status: string | undefined): string | undefined => {
  if (status === "PENDING_PAYMENT") {
    return "Menunggu Pembayaraan";
  }

  if (status === "CANCELED") {
    return "Pembayaran Dibatalkan";
  }

  if (status === "PAID") {
    return "Selesai";
  }
  return "";
};
