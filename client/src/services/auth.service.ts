import api from "../lib/axios";
import type { SignInType, SignResponseType, SignUpType } from "../models/auth-model";
import type { ResponseType } from "../types/types";

export class AuthService {

    // sign up 
    static async signUp(data: SignUpType): Promise<ResponseType<SignResponseType | null>> {

        // fetch with API
        const response = await api.post('/auth/signup', {
            ...data,
            role: 'customer'
        })
            .then(res => res.data)

        // return response data
        return response;
    }

    // cek auth admin
    static async cekAuthAdmin(): Promise<ResponseType<SignResponseType | null>> {

        // fetch with API
        const response = await api.get('/auth/cek-auth-admin')
            .then(res => res.data)

        // return response data
        return response;
    }


    // sign in 
    static async signIn(data: SignInType): Promise<ResponseType<SignResponseType | null>> {

        // get api with axios
        const response = await api.post('/auth/signin', data)
            .then(res => res.data)


        // return 
        return response
    }


    // cek auth customer
    static async cekAuthCustomer(): Promise<ResponseType<SignResponseType | null>> {

        // fetch with API
        const response = await api.get('/auth/cek-auth-customer')
            .then(res => res.data)

        // return response data
        return response;
    }

}