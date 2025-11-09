import type { BonusType, Genre, ReviewsType, TheatersType } from "../types/types";
import type { GenreResponseType } from "./genre-model";
import type { TheaterResponseType } from "./theater-model";


//  create 
export type MovieCreateType = {
    title: string;
    description: string;
    // rating: string;
    thumbnail: File;
    price: string;
    genreId: string;
    theaterId: number[];
    // bonus: number[];
}




// response 
export type MovieResponseType = {
    id: number;
    title: string;
    description: string;
    // rating: number;
    genre: GenreResponseType;
    thumbnail: string;
    url_thumbnail: string;
    // reviews: ReviewsType[];
    theater: TheaterResponseType[];
    // bonus: BonusType[];
    price: number;
};