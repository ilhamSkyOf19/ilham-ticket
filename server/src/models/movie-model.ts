import { Movie } from "../../generated/prisma";
import { BonusResponseType } from "./bonus-model";
import { GenreResponseType } from "./genre-model";
import { ReviewResponseType } from "./review-model";
import { TheaterResponseType } from "./theater-model";

// create
export type MovieCreateType = {
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  available: boolean;
  genreId: number;
  bonus: number[];
  theaterId: number[];
  times: string[];
  seats: number;
};

// update
export type MovieUpdateType = Partial<MovieCreateType> & {
  rating?: number;
};

// response
export type MovieResponseType = Omit<
  MovieCreateType,
  "genreId" | "theaterId" | "bonus" | "times"
> & {
  id: number;
  url_thumbnail: string;
  rating: number;
  genres: GenreResponseType;
  theaters: TheaterResponseType[];
  bonus: BonusResponseType[];
  reviews: Omit<ReviewResponseType, "movies">[];
  times: string[];
  seats: number;
  seatsBooked: number[];
};

// to response
export const toMovieResponse = (
  movie: Omit<Movie, "genreId" | "seatsBooked" | "times"> & {
    theaters: TheaterResponseType[];
    genres: GenreResponseType;
    bonus: BonusResponseType[];
    reviews: Omit<ReviewResponseType, "movies">[];
    seatsBooked: number[];
    times: string[];
  }
): MovieResponseType => {
  return {
    id: movie.id,
    title: movie.title,
    description: movie.description,
    thumbnail: movie.thumbnail,
    price: movie.price,
    rating: movie.rating,
    available: movie.available,
    genres: {
      id: movie.genres.id,
      name: movie.genres.name,
    },
    bonus: movie.bonus.map((b) => ({
      id: b.id,
      name: b.name,
      size: b.size,
      img: b.img,
      url_img: b.url_img,
    })),
    theaters: movie.theaters.map((t) => ({
      id: t.id,
      name: t.name,
      city: t.city,
      img: t.img,
      url_img: t.url_img,
    })),
    reviews:
      movie.reviews.map((r) => ({
        id: r.id,
        comment: r.comment,
        username: r.username,
        rating: r.rating,
      })) || [],
    url_thumbnail: movie.url_thumbnail,
    seats: movie.seats,
    seatsBooked: movie.seatsBooked,
    times: movie.times,
  };
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
