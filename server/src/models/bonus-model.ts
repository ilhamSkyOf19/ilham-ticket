import { Bonus } from "../../generated/prisma";

// create 
export type BonusCreateType = {
    name: string;
    size: string;
    img: string;

}


// update 
export type BonusUpdateType = Partial<BonusCreateType>


// response 
export type BonusResponseType = BonusCreateType & {
    id: number;
    url_img: string;
}


// to response 
export const toBonusResponse = (bonus: Bonus): BonusResponseType => {
    return {
        id: bonus.id,
        name: bonus.name,
        size: bonus.size,
        img: bonus.img,
        url_img: bonus.url_img
    }
}