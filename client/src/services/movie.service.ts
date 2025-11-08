import api from "../lib/axios";
import type { MovieResponseType } from "../models/movie-model";

export class MovieService {
    // create 
    static async create(data: FormData): Promise<MovieResponseType | null> {
        // fetch with API
        const response = await api.post('/movie/create', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)


        // return response data
        return response;
    }
}