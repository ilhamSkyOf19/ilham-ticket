import { type FC } from "react";
import ComponentInfo from "../ComponentInfo";

import iconVideo from "../../assets/images/icons/video-vertical-grey.svg";
import iconLocation from "../../assets/images/icons/location.svg";
import Rating from "../Rating";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import ButtonAction from "../ButtonAction";
import type { MovieResponseType } from "../../models/movie-model";

type Props = {
  disable?: boolean;
  dashboard?: boolean;
  movie: MovieResponseType;
  handleModalActive?: (id: number) => void;
};
const CardMovie: FC<Props> = ({
  disable,
  dashboard,
  movie,
  handleModalActive,
}) => {
  // navigate
  const navigate = useNavigate();

  return (
    <>
      {dashboard ? (
        <div
          className={clsx(
            "w-full flex flex-row justify-between",
            dashboard ? "items-start" : "items-center"
          )}
        >
          <div
            className={clsx(
              "flex-3/4 flex flex-row justify-start gap-4",
              dashboard ? "items-start" : "items-center"
            )}
          >
            {/* thumbnail */}
            <div className="bg-white rounded-3xl w-28 h-32 flex flex-col justify-center items-center overflow-hidden">
              <img
                src={movie.url_thumbnail}
                alt="thumbnail"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col justify-start items-start gap-2.5">
              <div
                className={clsx(
                  "w-full flex flex-row justify-start",
                  dashboard ? "items-start" : "items-center"
                )}
              >
                {/* description */}
                <div className="flex-3 h-full flex flex-col justify-center items-start gap-2">
                  {/* name */}
                  <h2 className="text-white font-semibold text-base text-left">
                    {movie.title.length > 15
                      ? movie.title.slice(0, 15).concat("...")
                      : movie.title}
                  </h2>

                  {/* genre */}
                  <ComponentInfo icon={iconVideo} label={movie.genres.name} />

                  {/* location */}
                  <ComponentInfo
                    icon={iconLocation}
                    label={movie?.theaters?.[0]?.city}
                  />
                </div>
                {/* rating */}
                <div className="h-full flex-1 flex flex-col justify-center items-end">
                  <Rating rating={movie.rating} />
                </div>
              </div>
              <div className="w-full flex flex-row justify-start items-center gap-2 flex-wrap">
                {/* detail */}
                <ButtonAction
                  color="bg-white/30"
                  label={"Detail"}
                  handleClick={() =>
                    navigate(`/dashboard/dashboard-movie-detail/${movie.id}`)
                  }
                />

                {/* update */}
                <ButtonAction
                  color="bg-blue-600"
                  label={"Update"}
                  handleClick={() =>
                    navigate(
                      `/dashboard/dashboard-movie-detail/${movie.id}/update`
                    )
                  }
                />

                {/* delete */}
                <ButtonAction
                  color="bg-red-600"
                  label={"Delete"}
                  handleClick={() => {
                    handleModalActive && handleModalActive(movie.id);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={disable}
          onClick={() => navigate(`/movie-detail/${movie.id}`)}
          className={clsx(
            "w-full flex flex-row justify-between",
            dashboard ? "items-start" : "items-center"
          )}
        >
          <div
            className={clsx(
              "flex-3/4 flex flex-row justify-start gap-4",
              dashboard ? "items-start" : "items-center"
            )}
          >
            {/* thumbnail */}
            <div className="bg-white rounded-3xl w-26 h-30 overflow-hidden flex flex-col justify-center items-center">
              <img
                src={movie.url_thumbnail}
                alt="thumbnail"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col justify-start items-start gap-2.5">
              <div
                className={clsx(
                  "w-full flex flex-row justify-start",
                  dashboard ? "items-start" : "items-center"
                )}
              >
                {/* description */}
                <div className="flex-3 h-full flex flex-col justify-center items-start gap-2">
                  {/* name */}
                  <h2 className="text-white font-semibold text-base text-left">
                    {movie.title.length > 15
                      ? movie.title.slice(0, 15).concat("...")
                      : movie.title}
                  </h2>

                  {/* genre */}
                  <ComponentInfo icon={iconVideo} label={movie.genres.name} />

                  {/* location */}
                  <ComponentInfo
                    icon={iconLocation}
                    label={movie?.theaters?.[0]?.city}
                  />
                </div>
                {/* rating */}
                <div className="h-full flex-1 flex flex-col justify-center items-end">
                  <Rating rating={movie.rating} />
                </div>
              </div>
            </div>
          </div>
        </button>
      )}
    </>
  );
};

export default CardMovie;
