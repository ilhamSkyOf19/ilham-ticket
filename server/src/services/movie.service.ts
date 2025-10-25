import { prisma } from "../lib/prisma";
import { MovieCreateType, MovieResponseReadType, MovieResponseType, MovieUpdateType, toMovieResponse, toMovieResponseRead } from "../models/movie-model";
import { FileService } from "./file..service";
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
    static async read(): Promise<MovieResponseReadType[] | null> {


        // get genre 
        const response = await prisma.movie.findMany({
            include: {
                genre: {
                    select: {
                        name: true
                    }
                },
                theater: {
                    select: {
                        city: true
                    }
                }
            }
        })


        // return 
        return response.map(toMovieResponseRead);
    }


    // read detail
    static async readDetail(id: number): Promise<MovieResponseReadType | null> {

        // get genre 
        const response = await prisma.movie.findFirstOrThrow({
            where: { id },
            include: {
                genre: {
                    select: {
                        name: true
                    }
                },
                theater: {
                    select: {
                        city: true
                    }
                }
            }
        });


        // return 
        return toMovieResponseRead(response);

    }


    // update
    static async update(id: number, req: MovieUpdateType & { url_thumbnail: string }): Promise<MovieResponseType | null> {

        // cek genre jika ada 
        if (req.genreId) {
            await GenreService.readDetail(+req.genreId);
        }

        // cek theater jika ada 
        if (req.theaterId) {
            await TheaterService.readDetail(+req.theaterId);
        }


        // cek movie 
        const movie = await this.readDetail(id);




        // update 
        const response = await prisma.movie.update({
            where: { id }, data: {
                ...req,
                thumbnail: req.thumbnail ? req.thumbnail : movie?.thumbnail,
                url_thumbnail: req.thumbnail ? req.url_thumbnail : movie?.url_thumbnail
            }
        });

        // delete thumbnail lama 
        if (movie?.url_thumbnail) {
            await FileService.deleteFIleFormPath('thumbnails', movie.thumbnail);
        }


        // return 
        return toMovieResponse(response);
    }


    // delete
    static async delete(id: number): Promise<MovieResponseType | null> {

        // get movie
        const movie = await this.readDetail(id);

        // delete file 
        if (movie?.thumbnail) {
            await FileService.deleteFIleFormPath('thumbnails', movie.thumbnail);
        }

        // delete movie
        const response = await prisma.movie.delete({ where: { id } });

        // return movie
        return toMovieResponse(response);
    }
}