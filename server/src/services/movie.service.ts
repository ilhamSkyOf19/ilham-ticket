import { prisma } from "../lib/prisma";
import { MovieCreateType, MovieResponseType, MovieUpdateType, toMovieResponse } from "../models/movie-model";
import { BonusService } from "./bonus.service";
import { FileService } from "./file.service";
import { GenreService } from "./genre.service";
import { TheaterService } from "./thater.service";

export class MovieService {
    // create
    static async create(req: MovieCreateType & { url_thumbnail: string }): Promise<MovieResponseType> {

        // cek genre 
        await GenreService.readDetail(+req.genreId);

        // cek tiap theater
        for (const id of req.theaterId) {
            await TheaterService.readDetail(id);
        }


        // cek tiap bonus 
        for (const id of req.bonus) {
            await BonusService.readDetail(id);
        }

        // create movie
        const response = await prisma.movie.create({
            data: {
                title: req.title,
                description: req.description,
                thumbnail: req.thumbnail,
                url_thumbnail: req.url_thumbnail,
                price: +req.price,
                available: Boolean(req.available),
                genreId: +req.genreId,

                // relasi many-to-many
                movieTheaters: {
                    createMany: {
                        data: req.theaterId.map((id) => ({ theaterId: id })),
                    },
                },

                movieBonus: {
                    createMany: {
                        data: req.bonus.map((id) => ({
                            bonusId: id
                        })),
                    },
                }


            },
            include: {
                movieTheaters: {
                    include: {
                        theater: {
                            select: {
                                id: true,
                                name: true,
                                city: true
                            }
                        }
                    }
                },
                movieBonus: {
                    include: {
                        bonus: {
                            select: {
                                id: true,
                                name: true,
                                size: true
                            }
                        }
                    }
                },
                genre: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        // mapping ke bentuk yang diharapkan toMovieResponse()
        return toMovieResponse({
            ...response,
            theaters: response.movieTheaters.map((mt) => mt.theater),
            bonus: response.movieBonus.map((mb) => mb.bonus),
            genres: [response.genre]
        });
    }


    // read
    static async read(): Promise<MovieResponseType[] | null> {


        // get genre 
        const response = await prisma.movie.findMany({
            include: {
                movieTheaters: {
                    include: {
                        theater: {
                            select: {
                                id: true,
                                name: true,
                                city: true
                            }
                        }
                    }
                },
                movieBonus: {
                    include: {
                        bonus: {
                            select: {
                                id: true,
                                name: true,
                                size: true
                            }
                        }
                    }
                },
                genre: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })


        // return 
        return response.map((movie) =>
            toMovieResponse({
                ...movie,
                theaters: movie.movieTheaters.map((mt) => mt.theater),
                bonus: movie.movieBonus.map((mb) => mb.bonus),
                genres: [movie.genre]
            })
        );
    }


    // read detail
    static async readDetail(id: number): Promise<MovieResponseType | null> {

        // get genre 
        const response = await prisma.movie.findFirstOrThrow({
            where: { id },
            include: {
                movieTheaters: {
                    include: {
                        theater: {
                            select: {
                                id: true,
                                name: true,
                                city: true
                            }
                        }
                    }
                },
                movieBonus: {
                    include: {
                        bonus: {
                            select: {
                                id: true,
                                name: true,
                                size: true
                            }
                        }
                    }
                },
                genre: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });


        // return 
        return toMovieResponse({
            ...response,
            theaters: response.movieTheaters.map((mt) => mt.theater),
            bonus: response.movieBonus.map((mb) => mb.bonus),
            genres: [response.genre]
        });

    }


    // update
    // static async update(id: number, req: MovieUpdateType & { url_thumbnail?: string }): Promise<MovieResponseType | null> {

    //     // cek genre jika ada 
    //     if (req.genreId) {
    //         await GenreService.readDetail(+req.genreId);
    //     }

    //     // cek theater jika ada 
    //     if (req.theaterId) {
    //         await TheaterService.readDetail(+req.theaterId);
    //     }


    //     // cek movie 
    //     const movie = await this.readDetail(id);




    //     // update 
    //     const response = await prisma.movie.update({
    //         where: { id }, data: {
    //             ...req,
    //             thumbnail: req.thumbnail ? req.thumbnail : movie?.thumbnail,
    //             url_thumbnail: req.thumbnail ? req.url_thumbnail : movie?.url_thumbnail
    //         }
    //     });

    //     // delete thumbnail lama 
    //     if (movie?.url_thumbnail) {
    //         await FileService.deleteFIleFormPath('thumbnails', movie.thumbnail);
    //     }


    //     // return 
    //     return toMovieResponse(response);
    // }


    // // delete
    // static async delete(id: number): Promise<MovieResponseType | null> {


    //     // delete movie
    //     const response = await prisma.movie.delete({ where: { id } });

    //     // delete file 
    //     if (response.thumbnail) {
    //         await FileService.deleteFIleFormPath('thumbnails', response.thumbnail);
    //     }

    //     // return movie
    //     return toMovieResponse(response);
    // }
}