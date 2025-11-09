import { Movie } from "../../generated/prisma";
import { BonusResponseType } from "./bonus-model";
import { GenreResponseType } from "./genre-model";
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
}


// update
export type MovieUpdateType = Partial<MovieCreateType>


// response 
export type MovieResponseType = Omit<MovieCreateType, 'genreId' | 'theaterId' | 'bonus'> & {
    id: number;
    url_thumbnail: string;
    genres: GenreResponseType[];
    theaters: TheaterResponseType[];
    bonus: BonusResponseType[];
}


// to response 
export const toMovieResponse = (movie: Omit<Movie, 'genreId'> & {
    theaters: TheaterResponseType[];
    genres: GenreResponseType[];
    bonus: BonusResponseType[];
}): MovieResponseType => {
    return {
        id: movie.id,
        title: movie.title,
        description: movie.description,
        thumbnail: movie.thumbnail,
        price: movie.price,
        available: movie.available,
        genres: movie.genres.map((g) => ({
            id: g.id,
            name: g.name
        })),
        bonus: movie.bonus.map((b) => ({
            id: b.id,
            name: b.name,
            size: b.size
        })),
        theaters: movie.theaters.map((t) => ({
            id: t.id,
            name: t.name,
            city: t.city

        })),
        url_thumbnail: movie.url_thumbnail
    }
}

