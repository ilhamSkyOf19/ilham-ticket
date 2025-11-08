import api from "../lib/axios";
import type { TheaterCreateType, TheaterResponseType } from "../models/theater-model";
import type { ResponseType } from "../types/types";

export class TheaterService {
    // read
    static async read(): Promise<ResponseType<TheaterResponseType[] | null>> {

        // call api 
        const response = await api.get('/theater/read').then(res => res.data);

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
}