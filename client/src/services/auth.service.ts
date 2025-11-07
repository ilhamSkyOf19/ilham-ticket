import api from "../lib/axios";
import type { SignUpResponseType, SignUpType } from "../models/auth-model";
import type { ResponseType } from "../types/types";

export class AuthService {

    // sign up 
    static async signUp(data: SignUpType): Promise<ResponseType<SignUpResponseType | null>> {

        // fetch with API
        const response = await api.post('/auth/signup', {
            ...data,
            role: 'customer'
        })
            .then(res => res.data)

        // return response data
        return response;
    }

    // get user 

}