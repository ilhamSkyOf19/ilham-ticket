import { prisma } from "../lib/prisma";
import { BonusCreateType, BonusResponseType, toBonusResponse } from "../models/bonus-model";

export class BonusService {
    // create 
    static async create(req: BonusCreateType): Promise<BonusResponseType | null> {
        // create genre 
        const response = await prisma.bonus.create({ data: req });

        // return genre
        return toBonusResponse(response);
    }


    // read 
    static async read(): Promise<BonusResponseType[] | null> {
        // get genre
        const response = await prisma.bonus.findMany();

        // return genre
        return response.map(toBonusResponse);
    }


    // read detail 
    static async readDetail(id: number): Promise<BonusResponseType | null> {
        // get genre 
        const response = await prisma.bonus.findFirstOrThrow({ where: { id } });

        // return genre
        return toBonusResponse(response);
    }
}