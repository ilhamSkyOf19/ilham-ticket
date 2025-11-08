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