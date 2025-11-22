import { useState, type FC } from "react";
import HeaderPage from "../../components/HeaderPage";
import CardHistoryTransaction from "../../components/CardHistoryTransaction";

// logo

import Saldo from "../../components/Saldo";
import ButtonTopup from "../../components/ButtonTopup";
import { useLoaderData } from "react-router-dom";
import type { ResponseType } from "../../types/types";
import type { WalletResponseType } from "../../models/wallet-model";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../components/Pagination";
import { HistoryTransactionService } from "../../services/historyTransaction.service";
import type { HistoryType } from "../../models/historyTransaction-model";

const EWalletPage: FC = () => {
  // loader
  const wallet = useLoaderData() as ResponseType<WalletResponseType | null>;

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
      <HistoryTransaction />
    </div>
  );
};

// component History Transaction
const HistoryTransaction: FC = () => {
  // state active page
  const [activePage, setActivePage] = useState<number>(1);

  // get transaction wallet by user
  const { isLoading, data: transactionWallet } = useQuery({
    queryKey: ["transaction-wallet-by-user", activePage, 15],
    queryFn: () => HistoryTransactionService.readAll(activePage, 15),
  });

  // start pagination
  const [paginationRange, setPaginationRange] = useState({ start: 1, end: 3 });

  // handle page
  const handlePage = (page: number) => setActivePage(page);

  // handle next
  const handleNext = () => {
    if (activePage >= (transactionWallet?.data?.totalPages ?? 0)) return;

    setActivePage((prev) => prev + 1);

    // cek apakah activePage melewati end
    setPaginationRange((prev) => {
      if (activePage + 1 > prev.end) {
        return { start: prev.start + 3, end: prev.end + 3 };
      }
      return prev;
    });
  };

  // handle prev
  const handlePrev = () => {
    if (activePage <= 1) return;

    setActivePage((prev) => prev - 1);

    // cek apakah activePage melewati start
    setPaginationRange((prev) => {
      if (activePage - 1 < prev.start) {
        return { start: prev.start - 3, end: prev.end - 3 };
      }
      return prev;
    });
  };

  return (
    <div className="w-full flex flex-col justify-start items-start gap-3">
      {/* header */}
      <h2 className="text-white font-medium text-base capitalize">
        latest transaction
      </h2>

      {/* history */}
      <div className="w-full flex flex-col justify-start items-start gap-4">
        {/* card */}
        {isLoading ? (
          <p>loading...</p>
        ) : transactionWallet?.status === "success" &&
          transactionWallet?.data ? (
          transactionWallet.data?.transaction.map(
            (item: HistoryType, index: number) => (
              <CardHistoryTransaction
                key={index}
                thumbnail={item.url_thumbnail}
                plus={item.type === "plus"}
                nominal={item.total}
                name={
                  item.type === "min" ? (item.name as string) : "top up wallet"
                }
                status={item.status}
                date={item.createdAt.toString()}
              />
            )
          )
        ) : null}
      </div>

      {/* container pagination */}
      <Pagination
        activePage={activePage}
        handlePage={handlePage}
        handlePrev={handlePrev}
        handleNext={handleNext}
        paginationRange={paginationRange}
        totalPages={transactionWallet?.data?.totalPages || 0}
      />
    </div>
  );
};

export default EWalletPage;
