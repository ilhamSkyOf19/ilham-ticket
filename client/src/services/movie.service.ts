import api from "../lib/axios";
import type { MovieResponseType } from "../models/movie-model";
import type { ResponseType } from "../types/types";

export class MovieService {
    // create 
    static async create(data: FormData): Promise<ResponseType<MovieResponseType | null>> {
        // fetch with API
        const response = await api.post('/movie/create', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)


        // return response data
        return response;
    }


    // read 
    static async read(): Promise<ResponseType<MovieResponseType[] | null>> {
        // fetch with API
        const response = await api.get('/movie/read').then(res => res.data)


        // return response data
        return response as ResponseType<MovieResponseType[] | null>;
    }


    // read detail 
    static async readDetail(id: number): Promise<ResponseType<MovieResponseType | null>> {

        // call api 
        const response = await api.get(`/movie/read-detail/${id}`).then(res => res.data);

        // return response data
        return response
    }


    // update 
    static async update(id: number, data: FormData): Promise<ResponseType<MovieResponseType | null>> {
        // call api 
        const response = await api.patch(`/movie/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);

        // return response data
        return response
    }


    // delete 
    static async delete(id: number): Promise<ResponseType<MovieResponseType[] | null>> {
        // call api 
        const response = await api.delete(`/movie/delete/${id}`).then(res => res.data);

        // return response data
        return response
    }
}