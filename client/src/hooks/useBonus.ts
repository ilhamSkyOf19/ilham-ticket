import { BonusService } from "../services/bonus.service"


// read 
export const useReadBonus = async () => {
    try {

        // get service 
        const response = await BonusService.read();

        // cek response
        if (!response) {
            return [];
        }

        // return
        return response

    } catch (error) {

        console.log(error);
        return [];
    }
}



// read detail 
export const useReadBonusDetail = async (id: number) => {
    try {

        // get service 
        const response = await BonusService.readDetail(id);

        // cek response
        if (!response) {
            return null;
        }

        // return
        return response

    } catch (error) {

        console.log(error);
        return null;
    }
}