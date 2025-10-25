import { prisma } from "../lib/prisma";
import { toUserResponse, UserCreateType, UserResponseType, UserUpdateType } from "../models/user-model";
import { FileService } from "./file.service";

export class UserService {
    // create 
    static async create(req: UserCreateType & { url_avatar: string }): Promise<UserResponseType> {
        // create user
        const response = await prisma.user.create({
            data: {
                ...req,
                url_avatar: req.url_avatar
            }
        });


        // return 
        return toUserResponse(response);
    }


    // read 
    static async read(): Promise<UserResponseType[]> {
        // create user
        const response = await prisma.user.findMany();

        // return 
        return response.map(toUserResponse);
    }


    // read detail 
    static async readDetail(id: number): Promise<UserResponseType> {

        // create user
        const response = await prisma.user.findFirstOrThrow({ where: { id } });


        // return 
        return toUserResponse(response);
    }


    // update 
    static async update(id: number, req: UserUpdateType & { url_avatar?: string }): Promise<UserResponseType> {

        // cek avatar 
        const user = await this.readDetail(id);



        // update user
        const response = await prisma.user.update({
            where: { id }, data: {
                ...req,
                avatar: req.avatar ? req.avatar : user.avatar,
                url_avatar: req.url_avatar ? req.url_avatar : user.url_avatar
            }
        });

        // delete file form path 
        if (req.avatar) {
            await FileService.deleteFIleFormPath('avatars', user.avatar);
        }


        // return 
        return toUserResponse(response);
    }

    // delete 
    static async delete(id: number): Promise<UserResponseType> {



        // delete user
        const response = await prisma.user.delete({ where: { id } });


        // delete file form path 
        if (response.avatar) {
            await FileService.deleteFIleFormPath('avatars', response.avatar);
        }


        // return 
        return toUserResponse(response);

    }



}