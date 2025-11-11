import api from "../lib/axios";
import type { BonusCreateType, BonusResponseType, BonusUpdateType } from "../models/bonus-model";
import type { ResponseType } from "../types/types";

export class BonusService {
    // create 
    static async create(data: BonusCreateType): Promise<ResponseType<BonusCreateType | null>> {

        // call api 
        const response = await api.post('/bonus/create', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);

        // return response data
        return response
    }


    // read 
    static async read(): Promise<ResponseType<BonusResponseType[] | null>> {

        // call api 
        const response = await api.get('/bonus/read').then(res => res.data);

        // return response data
        return response
    }


    // read 
    static async readDetail(id: number): Promise<ResponseType<BonusResponseType | null>> {

        // call api 
        const response = await api.get(`/bonus/read-detail/${id}`).then(res => res.data);

        // return response data
        return response
    }


    // update 
    static async update(id: number, data: BonusUpdateType): Promise<ResponseType<BonusResponseType[] | null>> {

        // call api 
        const response = await api.patch(`/bonus/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);

        // return response data
        return response
    }


    // delete 
    static async delete(id: number): Promise<ResponseType<BonusResponseType[] | null>> {

        // call api 
        const response = await api.delete(`/bonus/delete/${id}`).then(res => res.data);

        // return response data
        return response
    }
}