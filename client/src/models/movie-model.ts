import type { BonusType, Genre, ReviewsType, TheatersType } from "../types/types";

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