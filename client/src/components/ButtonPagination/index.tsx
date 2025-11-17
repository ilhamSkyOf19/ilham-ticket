import clsx from "clsx";
import { type FC } from "react";

type Props = {
  page: number;
  handlePage: (page: number) => void;
  active: boolean;
};
const ButtonPagination: FC<Props> = ({ page, handlePage, active }) => {
  return (
    <button
      type="button"
      onClick={() => handlePage(page)}
      className={clsx(
        " w-12 h-12 rounded-full transition-colors duration-200 ease-in-out",
        active ? "bg-white" : "bg-white/30"
      )}
    >
      <p
        className={clsx(
          " font-semibold text-base transition-colors duration-200 ease-in-out",
          active ? "text-black" : "text-white"
        )}
      >
        {page}
      </p>
    </button>
  );
};

export default ButtonPagination;
