import { useState, type FC } from "react";
import SearchBox from "../../components/SearchBox";
import { useForm } from "react-hook-form";
import { SearchValidation } from "../../validations/search-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SearchModel } from "../../models/search-model";
import clsx from "clsx";
import CardHighlightMovie from "../../components/CardHighlightMovie";

// profile dumy
import iconNotification from "../../assets/images/icons/notification-bell.svg";
import CardMovie from "../../components/CardMovie";
import CardComingSoon from "../../components/CardComingSoon";
import type { Genre, ResponseType } from "../../types/types";
import type { SignResponseType } from "../../models/auth-model";
import type { MovieHighlightResponseType } from "../../models/movie-model";
import { useLoaderData } from "react-router-dom";
import type { GenreResponseType } from "../../models/genre-model";
import { FaUserLarge } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { MovieService } from "../../services/movie.service";
import EmptyMessage from "../EmptyMessage";
import iconLoading from "../../assets/animation/loading-small.svg";
import { useDebounce } from "../../hooks/useDebouncedValue";

// type for loader data
type LoaderType = {
  user: ResponseType<SignResponseType | null>;
  movies: ResponseType<MovieHighlightResponseType[] | null>;
  genres: ResponseType<GenreResponseType[] | null>;
};

const HomePage: FC = () => {
  // state genre
  const [chooseGenre, setChooseGenre] = useState<number>(0);
  // loader
  const { user, movies, genres } = useLoaderData() as LoaderType;

  // use hook form
  const { register, watch } = useForm<SearchModel>({
    resolver: zodResolver(SearchValidation.SEARCH),
  });

  // keyword
  const keyword = watch("keyword");
  const debouncedRaw = useDebounce<string>(keyword, 1000);

  // debounced keyword
  const debouncedKeyword = keyword === "" ? "" : debouncedRaw;

  // use query
  const { data: moviesByGenre, isPending } = useQuery({
    queryKey: ["moviesByGenre", chooseGenre, debouncedKeyword],
    queryFn: () => {
      if (chooseGenre === 0 && keyword === "") {
        return MovieService.readHighlight();
      }
      // Ini akan dipanggil setelah 800ms user berhenti mengetik
      return MovieService.searchByTitle(debouncedKeyword || "", chooseGenre);
    },
    enabled: debouncedKeyword !== undefined, // optional
  });

  // cek keyword
  // useEffect(() => {
  //     console.log(watch('keyword'));
  // }, [watch('keyword')])

  return (
    <div className="w-full flex flex-col justify-start items-start gap-6">
      {/* header */}
      <HeaderComponent
        url_avatar={user?.data?.url_avatar}
        name={user?.data?.name || ""}
        role={user?.data?.role || ""}
      />

      {/* thumbnails film slide */}
      <div className="w-full overflow-x-auto scrollbar-hide flex flex-row justify-start items-start gap-4 snap-x snap-mandatory">
        {/* spacer */}
        <div className="shrink-0 snap-start" />
        {/* thumbnails Movie */}
        {movies?.data?.map(
          (movie: MovieHighlightResponseType, index: number) => (
            <CardHighlightMovie
              key={index}
              id={movie.id}
              thumbnail={movie.url_thumbnail}
            />
          )
        )}
        {/* spacer */}
        <div className="shrink-0 snap-start" />
      </div>

      {/* search box */}
      <div className="w-full px-4">
        <SearchBox register={register("keyword")} />
      </div>

      {/* genre */}
      <div className="w-full flex flex-col justify-start items-start gap-2">
        {/* title */}
        <h2 className="text-white font-semibold text-lg pl-4">Browse Genre</h2>

        {/* list genre */}
        <div className="w-full flex flex-row justify-start items-start gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          <div className="w-1 shrink-0 snap-start" />
          {genres?.data?.map((genre: GenreResponseType, index: number) => (
            <GenreComponent
              active={genre.id === chooseGenre}
              key={index}
              label={genre.name}
              handleClick={() => setChooseGenre(genre.id)}
            />
          ))}
          <div className="w-1 shrink-0 snap-start" />
        </div>
      </div>

      {/* card movie */}
      <div className="w-full flex flex-col justify-start items-start gap-3 px-4">
        {/* title */}
        <h2 className=" text-white font-semibold capitalize text-lg">
          all new movies
        </h2>

        {/* content card */}
        <div className="w-full flex flex-col justify-start items-start gap-5">
          {isPending ? (
            <div className="w-full flex flex-row justify-center items-center">
              <img src={iconLoading} alt="loading" className="w-10 h-10" />
            </div>
          ) : moviesByGenre?.data && moviesByGenre?.data?.length > 0 ? (
            movies?.data?.map(
              (movie: MovieHighlightResponseType, index: number) => (
                <CardMovie key={index} movie={movie} />
              )
            )
          ) : (
            <EmptyMessage message="Movie not found" />
          )}
        </div>
      </div>

      {/* coming soon movie */}
      <div className="w-full flex flex-col justify-start items-start gap-3">
        {/* title */}
        <h2 className=" text-white font-semibold capitalize text-lg pl-4">
          coming soon
        </h2>

        {/* content card */}
        <div className="w-full flex flex-row justify-start items-start gap-5 snap-x snap-mandatory overflow-x-auto scrollbar-hide">
          <div className="shrink-0 snap-start" />
          {movies?.data?.map(
            (movie: MovieHighlightResponseType, index: number) => (
              <CardComingSoon
                key={index}
                thumbnail={movie.url_thumbnail}
                id={movie.id}
                genre={movie.genre}
                title={movie.title}
              />
            )
          )}
          <div className="shrink-0 snap-start" />
        </div>
      </div>
    </div>
  );
};

// header
type PropsHeaderComponent = {
  name: string;
  role: string;
  url_avatar?: string;
};
const HeaderComponent: FC<PropsHeaderComponent> = ({
  name,
  role,
  url_avatar,
}) => {
  return (
    <div className="w-full flex flex-row justify-between items-center px-4">
      {/* profile */}
      <div className="flex-3/4 flex flex-row justify-start items-center gap-4">
        {/* img */}
        <div className="w-15 h-15 rounded-full  overflow-hidden">
          {url_avatar ? (
            <img
              src={url_avatar}
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden flex flex-row justify-center items-center">
              <FaUserLarge className="w-10 h-10 text-gray-400" />
            </div>
          )}
        </div>

        {/* label */}
        <div className="h-full flex flex-col justify-start items-start">
          {/* rank */}
          <p className="text-white font-light text-base capitalize">{role},</p>

          {/* name */}
          <h3 className="text-white font-semibold capitalize text-base">
            {name}
          </h3>
        </div>
      </div>

      {/* notification */}
      <div className="flex-1 flex flex-row justify-end items-center">
        <button type="submit" className="h-full">
          <img
            src={iconNotification}
            alt="icon notification"
            className="w-full h-full"
          />
        </button>
      </div>
    </div>
  );
};

// genre
type PropsGenre = {
  label: Omit<Genre, "All">;
  handleClick: () => void;
  active: boolean;
};
const GenreComponent: FC<PropsGenre> = ({ label, handleClick, active }) => {
  return (
    <button
      type="button"
      className={clsx(
        "  capitalize text-base font-semibold py-2.5 px-4 rounded-full transition-all duration-300 ease-in-out snap-start",
        active ? "bg-white text-black" : "bg-white/10 text-white"
      )}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default HomePage;
