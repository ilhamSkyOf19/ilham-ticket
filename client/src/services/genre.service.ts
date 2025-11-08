import api from "../lib/axios";
import type { GenreCreateType, GenreResponseType } from "../models/genre-model";

export class GenreService {
    // create 
    static async create(data: GenreCreateType): Promise<GenreResponseType | null> {
        // fetch with API
        const response = await api.post('/genre/create', data)
            .then(res => res.data)


        // return response data
        return response;
    }
}