import { error } from "console";
import { prisma } from "../lib/prisma";
import { GenreCreateType, GenreResponseType, GenreUpdateType, toGenreResponse } from "../models/genre-model";
import { ResponseType } from "../types/request-response-type";

export class GenreService {
    // create 
    static async create(req: GenreCreateType): Promise<GenreResponseType | null> {
        // create genre 
        const response = await prisma.genre.create({ data: req });


        // return genre
        return toGenreResponse(response);

    }


    // read 
    static async read(): Promise<GenreResponseType[] | null> {

        // get genre
        const response = await prisma.genre.findMany();


        // return genre
        return response.map(toGenreResponse);
    }


    // read detail
    static async readDetail(id: number): Promise<GenreResponseType | null> {
        // get genre 
        const response = await prisma.genre.findFirstOrThrow({ where: { id } });

        // return genre
        return toGenreResponse(response);

    }


    // update 
    static async update(id: number, req: GenreUpdateType): Promise<GenreResponseType | null> {
        //  cek genre 
        await this.readDetail(id);

        // update genre 
        const response = await prisma.genre.update({ where: { id }, data: req });


        return toGenreResponse(response);

    }


    // delete 
    static async delete(id: number): Promise<GenreResponseType | null> {
        // delete genre 
        const response = await prisma.genre.delete({ where: { id } });


        // return genre
        return toGenreResponse(response);
    }
}