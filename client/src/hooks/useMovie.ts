import { MovieService } from "../services/movie.service";

// read 
export const useReadMovie = async () => {
    try {
        // get service 
        const movies = await MovieService.read();

        // cek movies 
        if (!movies) {
            return []
        }

        // return movies
        return movies

    } catch (error) {
        console.log(error);
        return []
    }
}