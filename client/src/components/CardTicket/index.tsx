import { type FC } from "react";

// thumb
import thumbDefault from "../../assets/images/thumbnails/th3.png";
import iconVideo from "../../assets/images/icons/video-vertical-grey.svg";
import locationIcon from "../../assets/images/icons/location.svg";
import iconCalendar from "../../assets/images/icons/calendar-2-grey.svg";
import Status from "../Status";
import { Link } from "react-router-dom";
import clsx from "clsx";
import ComponentInfo from "../ComponentInfo";
import type { TransactionTicketType } from "../../models/transactionTicket-model";

// props
type Props = {
  movie: TransactionTicketType;
  detail?: boolean;
};

const CardTicket: FC<Props> = ({ movie, detail }) => {
  return (
    <Link
      to={detail ? "" : `/ticket/${movie.id}`}
      className={clsx(
        "w-full flex flex-row justify-start gap-3",
        detail ? "items-center" : "items-start"
      )}
    >
      {/* thumbnail */}
      <div className="flex-1">
        <div className="w-26 h-30 rounded-2xl overflow-hidden">
          <img
            src={movie.url_thumbnail ?? thumbDefault}
            alt="thumbnail"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* info */}
      <div className="flex-3 flex flex-col justify-start items-start gap-2">
        {/* name */}
        <h3 className="text-white font-semibold text-lg">{movie.title}</h3>

        {/* genre & location */}
        <div className="flex flex-row justify-start items-start gap-2">
          {/* genre */}
          <ComponentInfo icon={iconVideo} label={movie.genre.name} />

          {/* location */}
          <ComponentInfo icon={locationIcon} label={movie.theater.city} />
        </div>

        {/* date */}
        <ComponentInfo icon={iconCalendar} label={movie.time} />

        {/* status */}
        <Status status={movie.status} />
      </div>
    </Link>
  );
};

export default CardTicket;
