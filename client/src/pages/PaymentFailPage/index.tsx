import { type FC } from "react";
import dumyThumb from "../../assets/images/thumbnails/th3.png";
import SuccessPageLayout from "../../Layouts/SuccessPageLayout";
import { useParams } from "react-router-dom";

const PaymentFailPage: FC = () => {
  // get params
  const params = useParams() as { type: "ticket" | "wallet" };

  return (
    <SuccessPageLayout
      thumbnail={dumyThumb}
      title={params.type === "ticket" ? "Payment Failed" : "Topup Failed"}
      subtitle={
        params.type === "ticket"
          ? "Pembayaran tiket gagal diproses. Silakan coba kembali atau periksa metode pembayaran Anda."
          : "Topup e-wallet gagal diproses. Silakan coba kembali dalam beberapa saat."
      }
      buttonFirst={params.type === "ticket" ? "Book More" : "View My Ewallet"}
      buttonSecond={
        params.type === "ticket" ? "View My Tickets" : "Topup Again"
      }
      linkButtonFirst={params.type === "ticket" ? "/ticket" : "/wallet"}
      linkButtonSecond={params.type === "ticket" ? "/ticket" : "/topup-wallet"}
    />
  );
};

export default PaymentFailPage;
