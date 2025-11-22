import { type FC } from "react";
import dumyThumb from "../../assets/images/thumbnails/th3.png";
import SuccessPageLayout from "../../Layouts/SuccessPageLayout";
import { useParams } from "react-router-dom";

const PaymentSuccessPage: FC = () => {
  // get params
  const params = useParams() as { type: "ticket" | "wallet" };

  return (
    <SuccessPageLayout
      thumbnail={dumyThumb}
      title={params.type === "ticket" ? "Payment Success" : "Topup Successful"}
      subtitle={
        params.type === "ticket"
          ? "Tiket anda telah berhasil dibeli silahkan periksa pada menu my ticket"
          : "Kami telat mengupdate saldo Ewallet anda silahkan periksa kembali"
      }
      buttonFirst={params.type === "ticket" ? "Book More" : "View My Ewallet"}
      buttonSecond={
        params.type === "ticket" ? "View My Tickets" : "Topup Again"
      }
      linkButtonFirst={params.type === "ticket" ? "/" : "/wallet"}
      linkButtonSecond={params.type === "ticket" ? "/ticket" : "/topup-wallet"}
    />
  );
};

export default PaymentSuccessPage;
