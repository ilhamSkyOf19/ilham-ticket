import { Genre } from "../../generated/prisma/client";

// create 
export type GenreCreateType = {
    name: string
}


// update 
export type GenreUpdateType = Partial<GenreCreateType>;


// response 
export type GenreResponseType = GenreCreateType & {
    id: number
};

// to response 
export const toGenreResponse = (genre: Genre): GenreResponseType => {
    return {
        id: genre.id,
        name: genre.name
    }
}