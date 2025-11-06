import { prisma } from "../lib/prisma";
import { AuthResponseType, toAuthResponse } from "../models/auth-model";

export class AuthService {
    // cek user 
    static async checkUser(email: string): Promise<AuthResponseType & { password: string }> {


        // cek user with email
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        // return
        return {
            ...toAuthResponse({
                id: user?.id || 0,
                name: user?.name || '',
                email: user?.email || '',
                role: user?.role || 'customer'
            }),
            password: user?.password || ''
        }
    }



}