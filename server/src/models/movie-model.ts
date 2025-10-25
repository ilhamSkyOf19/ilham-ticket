import { Movie } from "../../generated/prisma";
import { GenreResponseType } from "./genre-model";
import { TheaterResponseType } from "./theater-model";

// create 
export type MovieCreateType = {
    title: string;
    description: string;
    thumbnail: string;
    price: number;
    available: boolean;
    bonus: string;
    genreId: number;
    theaterId: number;
}


// update
export type MovieUpdateType = Partial<MovieCreateType>


// response 
export type MovieResponseType = MovieCreateType & {
    id: number;
    url_thumbnail: string
}


// to response 
export const toMovieResponse = (movie: Movie): MovieResponseType => {
    return {
        id: movie.id,
        title: movie.title,
        description: movie.description,
        thumbnail: movie.thumbnail,
        price: movie.price,
        available: movie.available,
        bonus: movie.bonus,
        genreId: movie.genreId,
        theaterId: movie.theaterId,
        url_thumbnail: movie.url_thumbnail
    }
}


// response read
export type MovieResponseReadType = Omit<MovieCreateType, 'genreId' | 'theaterId'> & {
    id: number;
    url_thumbnail: string;
    genre: Omit<GenreResponseType, 'id'>;
    theater: Omit<TheaterResponseType, 'id' | 'name'>;
}


// to response 
export const toMovieResponseRead = (movie: Omit<Movie, 'genreId' | 'theaterId'> & {
    genre: Omit<GenreResponseType, 'id'>,
    theater: Omit<TheaterResponseType, 'id' | 'name'>
}): MovieResponseReadType => {
    return {
        id: movie.id,
        title: movie.title,
        description: movie.description,
        thumbnail: movie.thumbnail,
        price: movie.price,
        available: movie.available,
        bonus: movie.bonus,
        url_thumbnail: movie.url_thumbnail,
        genre: {
            name: movie.genre.name
        },
        theater: {
            city: movie.theater.city
        }
    }
}