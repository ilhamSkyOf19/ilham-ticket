import { prisma } from "../lib/prisma";
import { BonusCreateType, BonusResponseType, BonusUpdateType, toBonusResponse } from "../models/bonus-model";
import { toReviewResponse } from "../models/review-model";
import { ResponseType } from "../types/request-response-type";

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


    // update 
    static async update(id: number, data: BonusUpdateType): Promise<BonusResponseType | null> {

        // update genre 
        const response = await prisma.bonus.update({ where: { id }, data: data });


        // return response
        return toBonusResponse(response);
    }

    // delete 
    static async delete(id: number): Promise<BonusResponseType | null> {

        // cek data 
        await this.readDetail(id);

        // delete genre 
        const response = await prisma.bonus.delete({ where: { id } });

        // return genre
        return toBonusResponse(response);
    }
}