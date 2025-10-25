import { prisma } from "../lib/prisma";
import { MovieCreateType, MovieResponseType, toMovieResponse } from "../models/movie-model";
import { GenreService } from "./genre.service";
import { TheaterService } from "./thater.service";

export class MovieService {
    // create
    static async create(req: MovieCreateType & { url_thumbnail: string }): Promise<MovieResponseType> {

        // cek genre 
        await GenreService.readDetail(+req.genreId);

        // cek theater 
        await TheaterService.readDetail(+req.theaterId);

        // create genre
        const response = await prisma.movie.create({
            data: {
                ...req,
                price: (+req.price),
                available: Boolean(req.available),
                genreId: (+req.genreId),
                theaterId: (+req.theaterId)

            }
        });

        // return genre
        return toMovieResponse(response);
    }
    // read
    // read detail
    // update
    // delete
}