import { useCallback, useState, type FC } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import CardTicket from "../../components/CardTicket";

// thumbnail
import dumyThumb from "../../assets/images/thumbnails/th3.png";
import TicketsDetail from "../../components/TicketsDetail";
import type { ResponseType } from "../../types/types";
import type { TransactionTicketDetailType } from "../../models/transactionTicket-model";
import ButtonPayment from "../../components/ButtonPayment";
import ModalErrorUp from "../../components/ModalErrorUp";
import HeaderBack from "../../components/HeaderBack";

const TicketDetailPage: FC = () => {
  // state message
  const [message, setMessage] = useState<string>("");

  // state modal active
  const [modalActive, setModalActive] = useState<boolean>(false);

  // loader
  const transaction =
    useLoaderData() as ResponseType<TransactionTicketDetailType | null>;

  // navigate
  const navigate = useNavigate();

  //   handle payment
  const handlePayment = useCallback(() => {
    if (transaction?.data?.transaction.status !== "pending") return;

    // convert new date
    const lastTime = new Date(transaction?.data?.transaction.updatedAt ?? "");

    // current date
    const now = new Date();

    // diff time
    const diffTime = now.getTime() - lastTime.getTime();

    // jika masih dalam 24 jam
    if (diffTime <= 24 * 60 * 60 * 1000) {
      if (window.snap) {
        window.snap.pay(transaction?.data?.transaction.token as string, {
          onSuccess: () => navigate("/payment-success/ticket"),
          onPending: () => navigate("/payment-fail/ticket"),
          onError: () => navigate("/payment-fail/ticket"),
          onClose: () => navigate("/payment-fail/ticket"),
        });
      } else {
        setMessage("Snap belum siap, coba reload halaman.");
        setModalActive(true);
      }
    } else {
      // waktu habis
      setMessage("Waktu pembayaran telah habis.");
      setModalActive(true);
    }
  }, [transaction?.data?.transaction.status]);

  return (
    <div className="w-full min-h-screen bg-blue-dark flex flex-col justify-start items-center pt-14 gap-8 pb-32">
      <div className="w-full flex flex-col justify-start items-center relative gap-8 px-4">
        {/* header */}
        <HeaderBack label="Ticket Details" />

        {/* thumbnail */}
        <CardTicket
          movie={{
            id: transaction?.data?.movie.movieId.toString() ?? "",
            title: transaction?.data?.movie.title ?? "",
            genre: {
              name: transaction?.data?.movie.genre.name ?? "",
            },
            theater: {
              name: transaction?.data?.movie.theater.name ?? "",
              city: transaction?.data?.movie.theater.city ?? "",
            },
            status: transaction?.data?.transaction.status ?? "pending",
            time: transaction?.data?.transaction.time ?? "",
            url_thumbnail: transaction?.data?.movie.url_thumbnail ?? dumyThumb,
          }}
          detail={true}
        />

        {/* order details */}
        <TicketsDetail transaction={transaction?.data} />
      </div>

      {/* button rating */}
      {transaction?.data?.transaction?.status === "success" ? (
        <button
          type="button"
          onClick={() =>
            navigate(`/review/${transaction?.data?.movie.movieId}`)
          }
          className="w-[90%] bg-white rounded-full fixed bottom-8 py-3"
        >
          <p className="text-black text-center font-bold text-base">
            Give Review
          </p>
        </button>
      ) : transaction?.data?.transaction?.status === "pending" ? (
        <ButtonPayment
          price={transaction?.data?.transaction?.total ?? 0}
          handleContinue={handlePayment}
          labelButton="Pay Now"
          labelPrice=""
          loading={false}
        />
      ) : null}

      {/* modal message */}
      <ModalErrorUp
        message={message}
        active={modalActive}
        handleClose={() => setModalActive(false)}
      />
    </div>
  );
};

export default TicketDetailPage;
