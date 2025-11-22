import { type FC } from "react";
import ButtonPrevPage from "../ButtonPrevPage";
import ButtonPagination from "../ButtonPagination";
import ButtonNextPage from "../ButtonNextPage";

type Props = {
  activePage: number;
  handlePage: (page: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  paginationRange: {
    start: number;
    end: number;
  };
  totalPages: number;
};
const Pagination: FC<Props> = ({
  activePage,
  handlePage,
  handlePrev,
  handleNext,
  paginationRange,
  totalPages,
}) => {
  return (
    <div className="w-full flex flex-row justify-start items-center mt-4 gap-3">
      {activePage > 1 && <ButtonPrevPage handlePrev={handlePrev} />}
      {/* pagination */}
      {Array.from({ length: totalPages ?? 0 }, (_, i) => i + 1)
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
      {activePage < totalPages && <ButtonNextPage handleNext={handleNext} />}
    </div>
  );
};

export default Pagination;
