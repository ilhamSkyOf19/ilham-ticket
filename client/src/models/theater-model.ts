import type { MovieHighlightResponseType } from "./movie-model";

// create
export type TheaterCreateType = {
  name: string;
  city: string;
  img: File;
};

// update
export type TheaterUpdateType = Partial<TheaterCreateType>;

// response
export type TheaterResponseType = {
  id: number;
  name: string;
  city: string;
  img: string;
  url_img: string;
};

// response theaters with movie
export type TheaterWithMovieResponseType = {
  movie: MovieHighlightResponseType;
  theater: TheaterResponseType[];
};

// to response theaters with movie
export const toTheaterWithMovieResponse = (
  theaterWithMovie: TheaterWithMovieResponseType
): TheaterWithMovieResponseType => {
  return {
    movie: theaterWithMovie.movie,
    theater: theaterWithMovie.theater.map((theater) => {
      return {
        id: theater.id,
        img: theater.img,
        url_img: theater.url_img,
        name: theater.name,
        city: theater.city,
      };
    }),
  };
};

// response theater highlight
export type TheaterHighlightResponseType = {
  id: number;
  thumbnail: string;
  url_thumbnail: string;
  name: string;
  city: string;
};

// to response
export const toResponseTheaterHighlight = (
  theater: TheaterHighlightResponseType
): TheaterHighlightResponseType => {
  return {
    id: theater.id,
    thumbnail: theater.thumbnail,
    url_thumbnail: theater.url_thumbnail,
    name: theater.name,
    city: theater.city,
  };
};
