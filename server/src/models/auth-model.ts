import { Payload } from "../types/payload";

// login request 
export type LoginRequest = {
    email: string;
    password: string;
}

// auth response type
export type AuthResponseType = Payload;


// to response 
export const toAuthResponse = (data: Payload): AuthResponseType => {
    return {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role
    }
}