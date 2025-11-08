import { redirect } from "react-router-dom";
import { AuthService } from "../services/auth.service";

export class CheckAuth {

    static async useCheckAuth(role: 'customer' | 'admin'): Promise<void | ReturnType<typeof redirect>> {
        try {

            // get service auth 
            const auth = role === 'admin' ? await AuthService.cekAuthAdmin() : await AuthService.cekAuthCustomer();


            // cek 
            console.log(auth);


            // check if auth is null
            if (!auth.data) {
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
}
