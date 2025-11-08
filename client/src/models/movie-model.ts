import type { BonusType, Genre, ReviewsType, TheatersType } from "../types/types";


//  create 
export type MovieCreateType = {
    title: string;
    about: string;
    rating: string;
    location: string;
    thumbnail: File;
    price: string;
    genre: string;
    theaters: number[];
    // bonus: number[];
}



export type MovieType = {
    id: number;
    title: string;
    about: string;
    rating: number;
    genre: Genre;
    location: string;
    thumbnail: string;
    reviews: ReviewsType[];
    theaters: TheatersType[];
    // bonus: BonusType[];
    price: number;
}


// response 
export type MovieResponseType = MovieType;