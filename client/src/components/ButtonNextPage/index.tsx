import { type FC } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

type Props = {
  handleNext: () => void;
};
const ButtonNextPage: FC<Props> = ({ handleNext }) => {
  return (
    <button
      type="button"
      onClick={handleNext}
      className="bg-white/30 w-12 h-12 rounded-full flex flex-row justify-center items-center"
    >
      <MdOutlineKeyboardDoubleArrowRight className="text-white text-2xl" />
    </button>
  );
};

export default ButtonNextPage;
