import { useEffect, type FC } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { formatIDR } from "../../helpers/formated";
import MovieDetail from "../../fragments/MovieDetail";
import type { ResponseType } from "../../types/types";
import type { MovieResponseType } from "../../models/movie-model";
import { useAppDispatch } from "../../helpers/redux/hook";
import { setMovieId } from "../../store/transactionSlice";

// Props

const MovieDetailPage: FC = () => {
  // call hook redux
  const dispatch = useAppDispatch();

  // movie detail
  const movie = useLoaderData() as ResponseType<MovieResponseType | null>;

  // scrol top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // handle set movie id
  const handleSetMovieIdForTransaction = (id: number) => {
    dispatch(setMovieId(id));
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-start overflow-hidden bg-black">
      <MovieDetail movie={movie?.data as MovieResponseType} />

      {/* pricing */}
      <div className="w-full fixed bottom-0 py-4 flex flex-col justify-center items-center z-20">
        <div className="w-[90%] h-18 bg-white/10 backdrop-blur-sm rounded-full flex flex-row justify-between items-center pl-6 pr-3 py-2.5">
          {/* price */}
          <h2 className="text-white font-semibold text-xl">
            {formatIDR(movie?.data?.price ?? 0)} / Person
          </h2>

          {/* button */}
          <Link
            to={`/choose-theater/${movie?.data?.id}`}
            className="text-base font-bold text-black h-full flex justify-center items-center px-4 bg-white rounded-full capitalize"
          >
            buy ticket
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
