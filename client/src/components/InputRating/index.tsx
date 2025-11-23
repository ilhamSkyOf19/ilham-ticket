import { useState, type FC } from "react";
import type { UseFormClearErrors } from "react-hook-form";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import type { ReviewCreateType } from "../../models/review-model";
import ErrorMessage from "../ErrorMessage";
import clsx from "clsx";

// Props
type Props = {
  onChange: (value: number) => void;
  clearErrors: UseFormClearErrors<Omit<ReviewCreateType, "movieId">>;
  error?: string;
};
const InputRating: FC<Props> = ({ onChange, clearErrors, error }) => {
  // state choose rating
  const [choose, setChoose] = useState<number>(0);

  //   handle choose
  const handleChoose = (rating: number) => {
    // clear error
    clearErrors?.("rating");

    // set value
    setChoose(rating);

    // set value
    onChange(rating);
  };

  return (
    <div className="w-full flex flex-col justify-start items-start gap-1">
      {/* label */}
      <h2 className="text-white font-semibold text-base">Input Rating</h2>

      {/* input */}
      <div className="w-full flex flex-row justify-start items-start gap-1 mt-3">
        {[1, 2, 3, 4, 5].map((item) =>
          choose >= item ? (
            <button
              type="button"
              onClick={() => handleChoose(item)}
              key={item}
              className="w-9 h-9 rounded-full overflow-hidden"
            >
              <IoIosStar className="w-full h-full text-yellow-400" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleChoose(item)}
              key={item}
              className="w-9 h-9 rounded-full overflow-hidden"
            >
              <IoIosStarOutline
                className={clsx(
                  "w-full h-full transition-colors duration-300 ease-in-out",
                  error ? "text-red-500" : "text-white"
                )}
              />
            </button>
          )
        )}
      </div>

      {/* error message */}
      <ErrorMessage message={error} />
    </div>
  );
};

export default InputRating;
