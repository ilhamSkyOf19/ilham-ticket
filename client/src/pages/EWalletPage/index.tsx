import { useEffect, type FC } from "react";
import HeaderPage from "../../components/HeaderPage";
import CardHistoryTransaction from "../../components/CardHistoryTransaction";

// logo

import Saldo from "../../components/Saldo";
import ButtonTopup from "../../components/ButtonTopup";
import { useLoaderData } from "react-router-dom";
import type { ResponseType } from "../../types/types";
import type { WalletResponseType } from "../../models/wallet-model";
import type { TransactionWalletResponseType } from "../../models/transactionWallet-model";

type LoaderType = {
  wallet: ResponseType<WalletResponseType | null>;
  transactionWallet: ResponseType<TransactionWalletResponseType[] | null>;
};
const EWalletPage: FC = () => {
  // loader
  const { wallet, transactionWallet } = useLoaderData() as LoaderType;

  // cek
  useEffect(() => {
    console.log(wallet);
    console.log(transactionWallet);
  }, [wallet, transactionWallet]);

  return (
    <div className="w-full flex flex-col justify-start items-center px-6 gap-6 pb-12">
      {/* header */}
      <HeaderPage label="my wallet">
        {/* button top up */}
        <ButtonTopup />
      </HeaderPage>

      {/* saldo */}
      <Saldo
        saldo={wallet?.data?.balance || 0}
        name={wallet?.data?.name || ""}
        expired={(wallet?.data?.expired as string) || ""}
        branch={wallet?.data?.branch || ""}
      />

      {/* history transaction */}
      <HistoryTransaction transactionWallet={transactionWallet} />
    </div>
  );
};

// component History Transaction
type TransactionWalletType = {
  transactionWallet: ResponseType<TransactionWalletResponseType[] | null>;
};
const HistoryTransaction: FC<TransactionWalletType> = ({
  transactionWallet,
}) => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-3">
      {/* header */}
      <h2 className="text-white font-medium text-base capitalize">
        latest transaction
      </h2>

      {/* history */}
      <div className="w-full flex flex-col justify-start items-start gap-4">
        {/* card */}
        {transactionWallet?.status === "success" && transactionWallet?.data
          ? transactionWallet.data.map(
              (item: TransactionWalletResponseType, index: number) => (
                <CardHistoryTransaction
                  key={index}
                  plus={item.type === "plus"}
                  nominal={item.total}
                  name={"top up wallet"}
                  status={item.status}
                  date={item.createdAt.toString()}
                />
              )
            )
          : null}
      </div>
    </div>
  );
};

export default EWalletPage;
