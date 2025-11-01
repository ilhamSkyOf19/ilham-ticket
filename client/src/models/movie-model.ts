import type { BonusType, Genre, ReviewsType, TheatersType } from "../types/types";


//  create 
export type MovieCreateType = {
    title: string;
    about: string;
    rating: string;
    location: string;
    thumbnail: string;
    price: string;
    genre: string;
    theaters: string[];
    bonus: string[];

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
    bonus: BonusType[];
    price: number;
}