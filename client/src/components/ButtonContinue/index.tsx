import { type FC } from "react";

type Props = {
  handleContinueWithId?: (id: number | undefined) => void;
  label?: string;
  id?: number;
};
const ButtonContinue: FC<Props> = ({ label, handleContinueWithId, id }) => {
  return (
    <div className="fixed w-full flex flex-col justify-center items-center pb-4 bottom-0">
      <button
        type="button"
        className="w-[90%] bg-white rounded-full text-center capitalize py-3.5 font-bold text-black"
        onClick={() => {
          handleContinueWithId ? handleContinueWithId(id) : null;
        }}
      >
        {label ? label : "continue"}
      </button>
    </div>
  );
};

export default ButtonContinue;
