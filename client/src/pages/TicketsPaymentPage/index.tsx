import { useEffect, useState, type FC } from "react";
import HeaderBack from "../../components/HeaderBack";
import TicketsDetail from "../../components/TicketsDetail";
import ButtonPayment from "../../components/ButtonPayment";
import Saldo from "../../components/Saldo";
import { useLoaderData, useNavigate } from "react-router-dom";
import clsx from "clsx";
import ButtonTopup from "../../components/ButtonTopup";
import type { ResponseType } from "../../types/types";
import type { TransactionTicketDetailType } from "../../models/transactionTicket-model";
import type { WalletResponseType } from "../../models/wallet-model";

// type payload loader
type LoaderType = {
  transaction: ResponseType<TransactionTicketDetailType | null>;
  wallet: ResponseType<WalletResponseType | null>;
};

const TicketsPaymentPage: FC = () => {
  // state loader
  const [loading, setLoading] = useState<boolean>(false);

  // loader
  const { transaction, wallet } = useLoaderData() as LoaderType;

  // navigate
  const navigate = useNavigate();

  // state agreement
  const [agreement, setAgreement] = useState<boolean>(false);

  // state agrement not selected
  const [agreementNotSelected, setAgreementNotSelected] =
    useState<boolean>(false);

  // state saldo
  const [saldoNotEnough, setSaldoNotEnough] = useState<boolean>(false);

  // handle saldo not enough
  useEffect(() => {
    if (wallet?.data && transaction?.data) {
      if (wallet?.data.balance < transaction?.data.transaction.total) {
        setSaldoNotEnough(true);
      }
    }
  }, [transaction, wallet]);

  // handle agreement
  const handleAgreement = () => {
    if (agreementNotSelected) setAgreementNotSelected(false);

    // set agreement
    setAgreement(!agreement);
  };

  // handle continue
  const handleContinue = async () => {
    if (agreement) {
      // set agreement not selected
      setAgreementNotSelected(false);

      // state loading
      setLoading(true);

      // cek saldo
      if (window.snap) {
        window.snap.pay(transaction?.data?.transaction.token as string, {
          onSuccess: () => navigate("/payment-success/ticket"),
          onPending: () => navigate("/payment-fail/ticket"),
          onError: () => navigate("/payment-fail/ticket"),
          onClose: () => navigate("/payment-fail/ticket"),
        });

        // set loading
        setLoading(false);
      } else {
        alert("Snap belum siap, coba reload halaman.");
      }
      // set saldo not enough
      setSaldoNotEnough(false);
    } else {
      setAgreementNotSelected(true);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-start pt-12 gap-6 bg-black px-4 pb-36 relative">
      {/* header back */}
      <HeaderBack label="Tickets Payment" />

      {/* thumbnail */}
      {/* <CardMovie /> */}

      {/* order detail */}
      <TicketsDetail transaction={transaction.data} />

      {/* saldo e wallet  */}
      <div className="w-full flex flex-col justify-start items-start gap-4">
        {/* title */}
        <h3 className="text-white text-base font-semibold">My Wallet</h3>

        {/* saldo */}
        <div className="w-full flex flex-row justify-center items-center">
          <Saldo
            saldo={wallet?.data?.balance || 0}
            name={wallet?.data?.name || ""}
            expired={wallet?.data?.expired as string}
            branch={wallet?.data?.branch || ""}
          />
        </div>
      </div>

      {/* warning top up */}
      {saldoNotEnough && (
        <div className="w-full flex flex-row justify-between items-center rounded-2xl bg-red-500 py-3 px-4">
          {/* label */}
          <p className="text-white font-semibold text-base">
            Saldo Ewallet anda tidak <br /> mencukupi untuk saat ini
          </p>

          {/* button topup */}
          <ButtonTopup />
        </div>
      )}

      {/* button agreement */}
      {!saldoNotEnough && (
        <div className="w-full flex flex-row justify-start item-start gap-2 ">
          {/* checkbox */}
          <div className="flex-1">
            <button
              type="button"
              className={clsx(
                "w-8.5 h-8.5 border rounded-xl flex flex-col justify-center items-center",
                agreementNotSelected
                  ? "border-2 border-red-500"
                  : "border-blue-500"
              )}
            >
              <div
                className={clsx(
                  "w-5 h-5 rounded-md justify-center items-center bg-blue-700 transition-all duration-300 ease-in-out",
                  agreement ? "opacity-100" : "opacity-0"
                )}
                onClick={handleAgreement}
              />
            </button>
          </div>

          {/* label */}
          <p className="flex-8 text-white text-base">
            Saya setuju dengan ketentuan yang tersedia dan proses lanjut beli.
          </p>
        </div>
      )}

      {/* grand total + pay now */}

      <ButtonPayment
        price={transaction?.data?.transaction.total || 0}
        handleContinue={() => handleContinue()}
        labelPrice="Grand Total"
        labelButton="Pay Now"
        col={true}
        loading={loading}
      />
    </div>
  );
};

export default TicketsPaymentPage;
