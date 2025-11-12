import { type FC } from "react";

import videoPlay from "../../assets/images/icons/video-vertical-white.svg";
import { Link } from "react-router-dom";

type Props = {
  thumbnail: string;
  id: number;
  genre: string;
  title: string;
};

const CardComingSoon: FC<Props> = ({ thumbnail, id, genre, title }) => {
  return (
    <Link
      to={`/movie-detail/${id}`}
      className="snap-start w-60 h-68 bg-white rounded-3xl relative overflow-hidden shrink-0"
    >
      {/* thumbnail */}
      <div className="absolute w-full h-full">
        <img
          src={thumbnail}
          alt="thumbnail"
          className="w-full h-full object-cover"
        />
      </div>

      {/* description */}
      <div className="bg-transparent w-full h-full flex flex-col justify-end items-center px-4 pb-4">
        <div className="bg-white/10 backdrop-blur-sm w-full h-18 rounded-2xl flex flex-row justify-start items-center px-3 gap-2">
          {/* icon */}
          <img src={videoPlay} alt="icon" className="w-8 h-8" />

          {/* description */}
          <div className="h-full flex flex-col justify-center items-start">
            {/* genre */}
            <h3 className="text-white text-sm capitalize">{genre}</h3>

            {/* name */}
            <h2 className="text-white font-semibold text-base">
              {title.length > 13 ? title.slice(0, 13).concat("...") : title}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardComingSoon;
