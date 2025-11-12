import { type FC } from "react";
import iconPlay from "../../assets/images/icons/video-circle.svg";
import { Link } from "react-router-dom";
type Props = {
  id: number;
  thumbnail: string;
};
const CardHighlightMovie: FC<Props> = ({ id, thumbnail }) => {
  return (
    <Link
      to={`/movie-detail/${id}`}
      className="w-[18rem] h-48 flex flex-row justify-center items-center relative rounded-3xl overflow-hidden shrink-0 snap-start"
    >
      {/* img */}
      <div className="absolute w-full h-full overflow-hidden">
        <img
          src={thumbnail}
          alt="thumbnail"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* icon play */}
      <div className="w-13 h-13 bg-white/40 backdrop-blur-sm rounded-full flex flex-row justify-center items-center">
        <img src={iconPlay} alt="icon video play" />
      </div>
    </Link>
  );
};

export default CardHighlightMovie;
