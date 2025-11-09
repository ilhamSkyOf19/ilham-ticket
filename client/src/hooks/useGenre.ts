import { GenreService } from "../services/genre.service";

// read genre
export const useReadGenre = async () => {
    try {
        // get service 
        const genres = await GenreService.read();

        // cek genres 
        if (!genres) {
            return []
        }

        // return genres
        return genres

    } catch (error) {
        console.log(error);
        return []
    }
}