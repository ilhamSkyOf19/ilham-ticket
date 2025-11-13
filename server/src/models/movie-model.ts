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
  times: string;
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
  seatsBooked: string[];
};

// to response
export const toMovieResponse = (
  movie: Omit<Movie, "genreId" | "seatsBooked" | "times"> & {
    theaters: TheaterResponseType[];
    genres: GenreResponseType;
    bonus: BonusResponseType[];
    reviews: Omit<ReviewResponseType, "movies">[];
    seatsBooked: string[];
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
