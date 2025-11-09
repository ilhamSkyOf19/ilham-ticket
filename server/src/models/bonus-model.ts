import { Bonus } from "../../generated/prisma";

// create 
export type BonusCreateType = {
    name: string;
    size: string
}


// update 
export type BonusUpdateType = Partial<BonusCreateType>


// response 
export type BonusResponseType = BonusCreateType & {
    id: number;
}


// to response 
export const toBonusResponse = (bonus: Bonus): BonusResponseType => {
    return {
        id: bonus.id,
        name: bonus.name,
        size: bonus.size
    }
}