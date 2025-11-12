import { redirect } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import type { ResponseType } from "../types/types";
import type { SignResponseType } from "../models/auth-model";

export class CheckAuth {

    static async useCheckAuth(role: 'customer' | 'admin'): Promise<void | ReturnType<typeof redirect>> {
        try {

            // get service auth 
            const auth = role === 'admin' ? await AuthService.cekAuthAdmin() : await AuthService.cekAuthCustomer();


            // cek 
            console.log(auth);


            // check if auth is null
            if (role === 'admin' && auth?.data?.role !== 'admin') {
                // redirect to login
                return redirect('/signin');
            } else if (role === 'customer' && auth?.data?.role !== 'customer') {
                // redirect to login
                return redirect('/signin');
            }


            return;

        } catch (error) {

            // cek error 
            console.log(error);
            return redirect('/signin');
        }
    }


    // read 
    static async useCustomer(): Promise<ResponseType<SignResponseType | null>> {

        // get data 
        const data = await AuthService.cekAuthCustomer();


        // return data 
        return data
    }
}
