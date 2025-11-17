import { type FC } from "react";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

type Props = {
  handlePrev: () => void;
};

const ButtonPrevPage: FC<Props> = ({ handlePrev }) => {
  return (
    <button
      type="button"
      onClick={handlePrev}
      className="bg-white/30 w-12 h-12 rounded-full flex flex-row justify-center items-center"
    >
      <MdOutlineKeyboardDoubleArrowLeft className="text-white text-2xl" />
    </button>
  );
};

export default ButtonPrevPage;
