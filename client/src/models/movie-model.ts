import type { BonusResponseType } from "./bonus-model";
import type { GenreResponseType } from "./genre-model";
import type { ReviewResponseType } from "./review-model";
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
  reviews: ReviewResponseType[];
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

// response movie & theater & times
export type MovieTheaterTimesResponseType = {
  movie: MovieHighlightResponseType & {
    times: string[];
  };
  theater: TheaterResponseType;
};
