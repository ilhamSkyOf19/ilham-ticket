import api from "../lib/axios";
import type { TheaterCreateType, TheaterResponseType, TheaterUpdateType } from "../models/theater-model";
import type { ResponseType } from "../types/types";

export class TheaterService {
    // read
    static async read(): Promise<ResponseType<TheaterResponseType[] | null>> {

        // call api 
        const response = await api.get('/theater/read').then(res => res.data);

        // return response data
        return response
    }


    // read detail 
    static async readDetail(id: number): Promise<ResponseType<TheaterResponseType | null>> {

        // call api 
        const response = await api.get(`/theater/read-detail/${id}`)
            .then(res => res.data);

        // return response data
        return response
    }

    // create
    static async create(data: TheaterCreateType): Promise<ResponseType<TheaterResponseType[] | null>> {

        // call api 
        const response = await api.post('/theater/create', data).then(res => res.data);

        // return response data
        return response
    }


    // update 
    static async update(id: number, data: TheaterUpdateType): Promise<ResponseType<TheaterResponseType[] | null>> {

        // call api 
        const response = await api.patch(`/theater/update/${id}`, data)
            .then(res => res.data);

        // return response data
        return response
    }


    // delete 
    static async delete(id: number): Promise<ResponseType<TheaterResponseType[] | null>> {

        // call api 
        const response = await api.delete(`/theater/delete/${id}`)
            .then(res => res.data);

        // return response data
        return response
    }
}