import { User } from "../../generated/prisma";

// create 
export type UserCreateType = {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'customer';
    avatar: string;
}

// update 
export type UserUpdateType = Partial<UserCreateType>;



//  response 
export type UserResponseType = Omit<UserCreateType, 'password'> & {
    id: number;
    url_avatar: string;
}


// to response 
export const toUserResponse = (user: Omit<User, 'password'> & { url_avatar: string }): UserResponseType => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        url_avatar: user.url_avatar
    }
}