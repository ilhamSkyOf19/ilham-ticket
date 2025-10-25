import { Movie } from "../../generated/prisma";

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