import type { ReviewsType } from "../types/types";
import type { BonusResponseType } from "./bonus-model";
import type { GenreResponseType } from "./genre-model";
import type { TheaterResponseType } from "./theater-model";

//  create
export type MovieCreateType = {
  title: string;
  description: string;
  thumbnail: File;
  price: string;
  genreId: string;
  bonus: number[];
  theaterId: number[];
  times: string[];
  seats: string;
};

// update for seats booked
export type SeatsBookedType = {
  seatsBooked: number[];
};

// update
export type MovieUpdateType = Partial<MovieCreateType>;

// response
export type MovieResponseType = {
  id: number;
  title: string;
  description: string;
  rating: number;
  genres: GenreResponseType;
  thumbnail: string;
  url_thumbnail: string;
  reviews: ReviewsType[];
  theaters: TheaterResponseType[];
  bonus: BonusResponseType[];
  price: number;
  times: string[];
  seats: number;
  seatsBooked: number;
};

// response for highlight
export type MovieHighlightResponseType = {
  id: number;
  title: string;
  thumbnail: string;
  url_thumbnail: string;
  genre: string;
  city: string;
  rating: number;
};

// to response
export const toMovieHighlightResponse = (
  movie: MovieHighlightResponseType
): MovieHighlightResponseType => {
  return {
    id: movie.id,
    title: movie.title,
    thumbnail: movie.thumbnail,
    url_thumbnail: movie.url_thumbnail,
    genre: movie.genre,
    city: movie.city,
    rating: movie.rating,
  };
};

// response movie & theater & times
export type MovieTheaterTimesResponseType = {
  movie: MovieHighlightResponseType & {
    times: string[];
  };
  theater: TheaterResponseType;
};

export const toMovieAndTheaterResponse = (
  movie: MovieTheaterTimesResponseType
): MovieTheaterTimesResponseType => {
  return {
    movie: {
      id: movie.movie.id,
      title: movie.movie.title,
      thumbnail: movie.movie.thumbnail,
      url_thumbnail: movie.movie.url_thumbnail,
      genre: movie.movie.genre,
      city: movie.movie.city,
      rating: movie.movie.rating,
      times: movie.movie.times,
    },
    theater: movie.theater,
  };
};
