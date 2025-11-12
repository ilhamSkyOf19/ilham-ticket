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
                rating: 0,

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
                },

                review: {
                    createMany: {
                        data: []
                    }
                }

            },
            include: {
                movieTheaters: {
                    include: {
                        theater: {
                            select: {
                                id: true,
                                name: true,
                                city: true,
                                img: true,
                                url_img: true
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
                                size: true,
                                img: true,
                                url_img: true,
                            }
                        }
                    }
                },
                genre: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                review: {
                    select: {
                        id: true,
                        rating: true,
                        comment: true,
                        user: {
                            select: {
                                name: true
                            }
                        }
                    }

                }
            }
        });

        // mapping ke bentuk yang diharapkan toMovieResponse()
        return toMovieResponse({
            ...response,
            theaters: response.movieTheaters.map((mt) => mt.theater),
            bonus: response.movieBonus.map((mb) => mb.bonus),
            genres: response.genre,
            reviews: response.review.map((r) => ({
                id: r.id,
                username: r.user.name,
                rating: r.rating,
                comment: r.comment
            }))
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
                                city: true,
                                img: true,
                                url_img: true
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
                                size: true,
                                img: true,
                                url_img: true
                            }
                        }
                    }
                },
                genre: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                review: {
                    select: {
                        id: true,
                        rating: true,
                        comment: true,
                        user: {
                            select: {
                                name: true
                            }
                        }
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
                genres: movie.genre,
                reviews: movie.review.map((r) => ({
                    id: r.id,
                    username: r.user.name,
                    rating: r.rating,
                    comment: r.comment
                }))
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
                                city: true,
                                img: true,
                                url_img: true
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
                                size: true,
                                img: true,
                                url_img: true

                            }
                        }
                    }
                },
                genre: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                review: {
                    select: {
                        id: true,
                        rating: true,
                        comment: true,
                        user: {
                            select: {
                                name: true
                            }
                        }
                    }

                }
            }
        });


        // return 
        return toMovieResponse({
            ...response,
            theaters: response.movieTheaters.map((mt) => mt.theater),
            bonus: response.movieBonus.map((mb) => mb.bonus),
            genres: response.genre,
            reviews: response.review.map((r) => ({
                id: r.id,
                username: r.user.name,
                rating: r.rating,
                comment: r.comment
            }))
        });

    }


    // update
    static async update(id: number, req: MovieUpdateType & { url_thumbnail?: string }): Promise<MovieResponseType | null> {

        // cek genre jika ada 
        if (req.genreId) {
            await GenreService.readDetail(+req.genreId);
        }

        // cek theater jika ada 
        if (req.theaterId) {
            for (const idTheater of req.theaterId) {
                await TheaterService.readDetail(idTheater);
            }
        }


        // cek tiap bonus 
        if (req.bonus) {
            for (const idBonus of req.bonus) {
                await BonusService.readDetail(idBonus);
            }
        }



        // cek movie 
        const movie = await this.readDetail(id);

        // delete thumbnail lama 
        if (req.thumbnail && movie?.thumbnail && movie.thumbnail !== req.thumbnail) {
            await FileService.deleteFIleFormPath('thumbnails', movie.thumbnail);
        }





        // update 
        const response = await prisma.movie.update({
            where: { id },
            data: {
                title: req.title,
                description: req.description,
                price: req.price,
                available: req.available ? req.available : movie?.available,
                genreId: req.genreId,
                rating: req.rating,

                thumbnail: req.thumbnail,
                url_thumbnail: req.url_thumbnail,


                // update movie
                movieTheaters: req.theaterId ? {
                    deleteMany: {},
                    createMany: {
                        data: req.theaterId.map((idTheater) => ({
                            theaterId: idTheater
                        }))
                    }
                } : undefined,


                // update bonus
                movieBonus: req.bonus ? {
                    deleteMany: {},
                    createMany: {
                        data: req.bonus.map((idBonus) => ({
                            bonusId: idBonus
                        }))
                    }
                } : undefined
            },
            include: {
                movieTheaters: {
                    include: {
                        theater: {
                            select: {
                                id: true,
                                name: true,
                                city: true,
                                img: true,
                                url_img: true
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
                                size: true,
                                img: true,
                                url_img: true
                            }
                        }
                    }
                },
                genre: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                review: {
                    select: {
                        id: true,
                        rating: true,
                        comment: true,
                        user: {
                            select: {
                                name: true
                            }
                        }
                    }

                }
            }
        });




        // return 
        return toMovieResponse({
            ...response,
            theaters: response.movieTheaters.map((mt) => mt.theater),
            bonus: response.movieBonus.map((mb) => mb.bonus),
            genres: response.genre,
            reviews: response.review.map((r) => ({
                id: r.id,
                username: r.user.name,
                rating: r.rating,
                comment: r.comment
            }))
        });
    }


    // delete
    static async delete(id: number): Promise<MovieResponseType | null> {


        // delete movie
        const response = await prisma.movie.delete({
            where: { id },
            include: {
                movieTheaters: {
                    include: {
                        theater: {
                            select: {
                                id: true,
                                name: true,
                                city: true,
                                img: true,
                                url_img: true
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
                                size: true,
                                img: true,
                                url_img: true
                            }
                        }
                    }
                },
                genre: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                review: {
                    select: {
                        id: true,
                        rating: true,
                        comment: true,
                        user: {
                            select: {
                                name: true
                            }
                        }
                    }

                }
            }
        });

        // delete file 
        if (response.thumbnail) {
            await FileService.deleteFIleFormPath('thumbnails', response.thumbnail);
        }

        // return movie
        return toMovieResponse({
            ...response,
            theaters: response.movieTheaters.map((mt) => mt.theater),
            bonus: response.movieBonus.map((mb) => mb.bonus),
            genres: response.genre,
            reviews: response.review.map((r) => ({
                id: r.id,
                username: r.user.name,
                rating: r.rating,
                comment: r.comment
            }))
        });
    }
}