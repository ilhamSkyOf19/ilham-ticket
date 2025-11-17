import { useState, type FC } from "react";
import HeaderPage from "../../components/HeaderPage";
import CardHistoryTransaction from "../../components/CardHistoryTransaction";

// logo

import Saldo from "../../components/Saldo";
import ButtonTopup from "../../components/ButtonTopup";
import { useLoaderData } from "react-router-dom";
import type { ResponseType } from "../../types/types";
import type { WalletResponseType } from "../../models/wallet-model";
import type {
  TransactionWalletResponseType,
  TransactionWalletWithPaginationResponseType,
} from "../../models/transactionWallet-model";
import ButtonPagination from "../../components/ButtonPagination";
import ButtonNextPage from "../../components/ButtonNextPage";
import ButtonPrevPage from "../../components/ButtonPrevPage";
import { useQuery } from "@tanstack/react-query";
import { TransactionService } from "../../services/transaction.service";

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
  const {
    isLoading,
    data: transactionWallet,
    refetch,
  } = useQuery<
    ResponseType<TransactionWalletWithPaginationResponseType | null>
  >({
    queryKey: ["transaction-wallet-by-user", activePage, 15],
    queryFn: () =>
      TransactionService.readTransactionWalletByUser(activePage, 15),
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

    // refetch
    refetch();
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
        ) : null}
      </div>

      {/* container pagination */}
      <div className="w-full flex flex-row justify-start items-center mt-4 gap-3">
        {activePage > 3 && <ButtonPrevPage handlePrev={handlePrev} />}
        {/* pagination */}
        {Array.from(
          { length: transactionWallet?.data?.totalPages ?? 0 },
          (_, i) => i + 1
        )
          .slice(paginationRange.start - 1, paginationRange.end)
          .map((i) => (
            <ButtonPagination
              key={i}
              page={i}
              active={i === activePage}
              handlePage={handlePage}
            />
          ))}

        {/* next page */}
        <ButtonNextPage handleNext={handleNext} />
      </div>
    </div>
  );
};

export default EWalletPage;
