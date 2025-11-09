import { TheaterService } from "../services/theater.service"


// read all
export const useReadTheater = async () => {
    try {

        // get service 
        const theaters = await TheaterService.read();

        // cek theaters 
        if (!theaters) {
            return [];
        }


        // return theaters
        return theaters

    } catch (error) {
        console.log(error);
        return [];
    }
}


// read detail 
export const useReadTheaterDetail = async (id: number) => {
    try {

        // get service 
        const theater = await TheaterService.readDetail(id);

        // cek theaters 
        if (!theater) {
            return null;
        }


        // return theaters
        return theater

    } catch (error) {
        console.log(error);
        return null;
    }
}