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
