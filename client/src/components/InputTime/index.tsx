import { useEffect, useState, type FC } from "react";
import type { UseFormClearErrors, UseFormSetValue } from "react-hook-form";
import { FaCircleCheck } from "react-icons/fa6";
import { FiTrash } from "react-icons/fi";
import type {
  MovieCreateType,
  MovieUpdateType,
} from "../../models/movie-model";
import ErrorMessage from "../ErrorMessage";
import clsx from "clsx";

type Props = {
  name: string;
  setValue: UseFormSetValue<MovieCreateType | MovieUpdateType>;
  clearErrors?: UseFormClearErrors<MovieCreateType | MovieUpdateType>;
  error?: string;
};

const InputTime: FC<Props> = ({ setValue, error, clearErrors }) => {
  // state time
  const [time, setTime] = useState<string>("");

  // state choose times
  const [choose, setChoose] = useState<string[]>([]);

  // handle choose
  const handleChoose = () => {
    if (!time) return;
    // cek choose & filter
    // set choose
    setChoose([...choose, time]);
  };

  //   handle delete choose
  const handleDeleteChoose = (time: string) => {
    if (time) {
      setChoose(choose.filter((item) => item !== time));
    }
  };

  //   set value
  useEffect(() => {
    // set value
    setValue("times", choose);

    // clear error
    clearErrors?.("times");
  }, [choose]);

  return (
    <div className="w-full flex flex-col justify-start items-start gap-2">
      {/* label */}
      <h3 className="text-white text-base font-medium">Choose Times</h3>

      <div className="w-full flex flex-row justify-start items-center gap-4">
        {/* input time */}
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className={clsx(
            "border border-gray-300 rounded-lg px-3 py-2 text-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all duration-300 ease-in-out",
            error ? "ring-2 ring-red-500" : "ring-white"
          )}
        />

        {/* submit */}
        <button type="button" onClick={handleChoose}>
          <FaCircleCheck className="w-7 h-7 text-green-500" />
        </button>
      </div>

      {/* preview times */}
      <div className="w-full flex flex-row justify-start items-start mt-3 gap-3 flex-wrap">
        {/* card times */}
        {choose.length > 0 ? (
          choose.map((item: string, index: number) => (
            <div className="h-10 bg-white/20 backdrop-blur-sm flex flex-row justify-start items-center rounded-xl gap-2 overflow-hidden">
              <h2
                key={index}
                className="text-white font-semibold text-base pl-3"
              >
                {item}
              </h2>

              {/* button delete trash */}
              <button
                type="button"
                onClick={() => handleDeleteChoose(item)}
                className="bg-red-600 h-full px-1.5"
              >
                <FiTrash className="w-4 h-4 text-white" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-white text-sm font-semibold">
            Please choose times
          </p>
        )}
      </div>

      {/* error message */}
      <ErrorMessage message={error} />
    </div>
  );
};

export default InputTime;
