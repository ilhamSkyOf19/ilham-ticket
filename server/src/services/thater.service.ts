import { prisma } from "../lib/prisma";
import { TheaterCreateType, TheaterResponseType, TheaterUpdateType, toTheaterResponse } from "../models/theater-model";

export class TheaterService {
    // create
    static async create(req: TheaterCreateType): Promise<TheaterResponseType | null> {
        // create genre 
        const response = await prisma.theater.create({ data: req });

        // return genre
        return toTheaterResponse(response);
    }

    // read
    static async read(): Promise<TheaterResponseType[] | null> {
        // get genre
        const response = await prisma.theater.findMany();

        // return genre
        return response.map(toTheaterResponse);
    }


    // read detail
    static async readDetail(id: number): Promise<TheaterResponseType | null> {
        // get genre 
        const response = await prisma.theater.findFirstOrThrow({ where: { id } });

        // return genre
        return toTheaterResponse(response);
    }


    // update
    static async update(id: number, req: TheaterUpdateType): Promise<TheaterResponseType | null> {

        // update genre 
        const response = await prisma.theater.update({ where: { id }, data: req });

        return toTheaterResponse(response);
    }


    // delete
    static async delete(id: number): Promise<TheaterResponseType | null> {
        // delete genre 
        const response = await prisma.theater.delete({ where: { id } });

        // return genre
        return toTheaterResponse(response);
    }
}