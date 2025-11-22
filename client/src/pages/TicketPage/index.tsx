import { useState, type FC } from "react";
import HeaderPage from "../../components/HeaderPage";
import CardTicket from "../../components/CardTicket";
import { useQuery } from "@tanstack/react-query";
import { TransactionService } from "../../services/transaction.service";
import type { TransactionTicketType } from "../../models/transactionTicket-model";
import EmptyMessage from "../EmptyMessage";
import Pagination from "../../components/Pagination";
import loadingWhite from "../../assets/animation/loading-small.svg";

const TicketPage: FC = () => {
  // state active
  const [activePage, setActivePage] = useState<number>(1);

  // state range pagination
  const [paginationRange, setPaginationRange] = useState({ start: 1, end: 3 });
  // query
  const { data: ticket, isLoading } = useQuery({
    queryKey: ["ticket", activePage, 15],
    queryFn: () =>
      TransactionService.readTransactionTicketByUser(activePage, 15),
  });

  // handle page
  const handlePage = (page: number) => {
    setActivePage(page);
  };

  // handle next page
  const handleNextPage = () => {
    // cek apakah activePage melewati end
    if (activePage >= (ticket?.data?.totalPages ?? 0)) return;

    // set active page
    setActivePage((prev) => prev + 1);

    // set next but if activePage melewati end
    setPaginationRange((prev) => {
      if (activePage + 1 > prev.end) {
        return { start: prev.start + 3, end: prev.end + 3 };
      }
      return prev;
    });
  };

  // handle prev
  const handlePrevPage = () => {
    // cek apakah activePage melewati start
    if (activePage <= 1) return;

    // set active page
    setActivePage((prev) => prev - 1);

    // set next but if activePage melewati start
    setPaginationRange((prev) => {
      if (activePage - 1 < prev.start) {
        return { start: prev.start - 3, end: prev.end - 3 };
      }
      return prev;
    });
  };

  return (
    <div className="w-full flex flex-col justify-start items-center px-6 pb-12 gap-4">
      {/* header */}
      <HeaderPage label="My Tickets" />

      {/* tickets */}
      <div className="w-full flex flex-col justify-start items-start gap-4.5">
        {/* card ticket */}
        {ticket?.data && ticket.data.transaction.length > 0 ? (
          isLoading ? (
            <div className="w-full flex flex-row justify-center items-center">
              <img src={loadingWhite} alt="loading" className="w-18 h-18" />
            </div>
          ) : (
            <div className="w-full flex flex-col justify-start items-start gap-4.5">
              {ticket.data.transaction.map(
                (item: TransactionTicketType, index: number) => (
                  <CardTicket key={index} movie={item} />
                )
              )}
              {/* pagination */}
              <Pagination
                activePage={activePage}
                handleNext={handleNextPage}
                handlePrev={handlePrevPage}
                handlePage={handlePage}
                paginationRange={paginationRange}
                totalPages={ticket?.data?.totalPages || 0}
              />
            </div>
          )
        ) : (
          <EmptyMessage message="You don't have any tickets" />
        )}
      </div>
    </div>
  );
};

export default TicketPage;
