import { type FC } from "react";
import { useMatch } from "react-router-dom";
import type { ReviewResponseType } from "../../models/review-model";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";

type Props = {
  review: ReviewResponseType;
};
const CardReview: FC<Props> = ({ review: { rating, comment, username } }) => {
  // cek admin with path
  const admin = useMatch("/dashboard/dashboard-movie-detail/:id");

  return (
    <div className="w-full rounded-3xl bg-white/10 flex flex-col justify-start items-start py-4 px-5 gap-3 relative">
      {/* button delete */}
      {admin &&
        // <ButtonDeleteTrash />
        null}

      {/* rating */}
      <div className="w-full flex flex-row justify-start items-start gap-1">
        {Array.from({ length: rating }, (_, i) => (
          <IoIosStar key={i} className="text-yellow-400 text-xl" />
        ))}
        {Array.from({ length: 5 - rating }, (_, i) => (
          <IoIosStarOutline key={i} className="text-yellow-400 text-xl" />
        ))}
      </div>

      {/* comments */}
      {comment.length > 0 ? (
        <p className="text-white text-base font-light">{comment}</p>
      ) : (
        <p className="text-white text-base font-light">No Comments</p>
      )}

      {/* author */}
      <p className="text-white text-base font-semibold">{username}</p>
    </div>
  );
};

export default CardReview;
