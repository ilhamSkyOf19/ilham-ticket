import api from "../lib/axios";
import type { GenreCreateType, GenreResponseType } from "../models/genre-model";
import type { ResponseType } from "../types/types";

export class GenreService {
    // create 
    static async create(data: GenreCreateType): Promise<ResponseType<GenreResponseType[] | null>> {
        // fetch with API
        const response = await api.post('/genre/create', data)
            .then(res => res.data)


        // return response data
        return response;
    }

    // read genre 
    static async read(): Promise<ResponseType<GenreResponseType[] | null>> {
        // fetch with API
        const response = await api.get('/genre/read')
            .then(res => res.data)


        // return response data
        return response;
    }

    // read detail
    static async readDetail(id: number): Promise<ResponseType<GenreResponseType | null>> {
        // fetch with API
        const response = await api.get(`/genre/read-detail/${id}`)
            .then(res => res.data)


        // return response data
        return response;
    }

    // delete genre 
    static async delete(id: number): Promise<ResponseType<GenreResponseType[] | null>> {
        // fetch with API
        const response = await api.delete(`/genre/delete/${id}`)
            .then(res => res.data)


        // return response data
        return response;
    }
}