import { prisma } from "../lib/prisma";
import { BookedResponseType, toBookedResponse } from "../models/booked-model";
import {
  MovieCreateType,
  MovieResponseType,
  MovieUpdateType,
  toMovieResponse,
} from "../models/movie-model";
import { BonusService } from "./bonus.service";
import { FileService } from "./file.service";
import { GenreService } from "./genre.service";
import { TheaterService } from "./thater.service";

export class MovieService {
  // create
  static async create(
    req: MovieCreateType & { url_thumbnail: string }
  ): Promise<MovieResponseType> {
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
        seats: +req.seats,

        // relasi seats
        booked: {
          createMany: {
            data: req.times.map((time) => ({
              times: time,
              seatsBooked: JSON.stringify([]),
            })),
          },
        },
        // relasi many-to-many
        movieTheaters: {
          createMany: {
            data: req.theaterId.map((id) => ({ theaterId: id })),
          },
        },

        // relasi bonus
        movieBonus: {
          createMany: {
            data: req.bonus.map((id) => ({
              bonusId: id,
            })),
          },
        },

        review: {
          createMany: {
            data: [],
          },
        },
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
                url_img: true,
              },
            },
          },
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
              },
            },
          },
        },
        genre: {
          select: {
            id: true,
            name: true,
          },
        },
        review: {
          select: {
            id: true,
            rating: true,
            comment: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        booked: {
          select: {
            times: true,
            seatsBooked: true,
          },
        },
      },
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
        comment: r.comment,
      })),
      times: response.booked.map((b) => b.times),
      seatsBooked: response.booked.map((b) => JSON.parse(b.seatsBooked)),
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
                url_img: true,
              },
            },
          },
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
              },
            },
          },
        },
        genre: {
          select: {
            id: true,
            name: true,
          },
        },
        review: {
          select: {
            id: true,
            rating: true,
            comment: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        booked: {
          select: {
            times: true,
            seatsBooked: true,
          },
        },
      },
    });

    // return
    return response.map((movie) =>
      toMovieResponse({
        ...movie,
        times: movie.booked.map((b) => b.times),
        seatsBooked: movie.booked.map((b) => JSON.parse(b.seatsBooked)),
        theaters: movie.movieTheaters.map((mt) => mt.theater),
        bonus: movie.movieBonus.map((mb) => mb.bonus),
        genres: movie.genre,
        reviews: movie.review.map((r) => ({
          id: r.id,
          username: r.user.name,
          rating: r.rating,
          comment: r.comment,
        })),
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
                url_img: true,
              },
            },
          },
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
              },
            },
          },
        },
        genre: {
          select: {
            id: true,
            name: true,
          },
        },
        review: {
          select: {
            id: true,
            rating: true,
            comment: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        booked: {
          select: {
            times: true,
            seatsBooked: true,
          },
        },
      },
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
        comment: r.comment,
      })),
      times: response.booked.map((b) => b.times),
      seatsBooked: response.booked.map((b) => JSON.parse(b.seatsBooked)),
    });
  }

  // update
  static async update(
    id: number,
    req: MovieUpdateType & { url_thumbnail?: string }
  ): Promise<MovieResponseType | null> {
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
    if (
      req.thumbnail &&
      movie?.thumbnail &&
      movie.thumbnail !== req.thumbnail
    ) {
      await FileService.deleteFIleFormPath("thumbnails", movie.thumbnail);
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
        seats: req.seats,

        thumbnail: req.thumbnail,
        url_thumbnail: req.url_thumbnail,

        // update times
        booked: req.times
          ? {
              deleteMany: {},
              createMany: {
                data: req.times.map((time) => ({
                  times: JSON.stringify(time),
                  seatsBooked: JSON.stringify([]),
                })),
              },
            }
          : undefined,
        // update movie
        movieTheaters: req.theaterId
          ? {
              deleteMany: {},
              createMany: {
                data: req.theaterId.map((idTheater) => ({
                  theaterId: idTheater,
                })),
              },
            }
          : undefined,

        // update bonus
        movieBonus: req.bonus
          ? {
              deleteMany: {},
              createMany: {
                data: req.bonus.map((idBonus) => ({
                  bonusId: idBonus,
                })),
              },
            }
          : undefined,
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
                url_img: true,
              },
            },
          },
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
              },
            },
          },
        },
        genre: {
          select: {
            id: true,
            name: true,
          },
        },
        review: {
          select: {
            id: true,
            rating: true,
            comment: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        booked: {
          select: {
            times: true,
            seatsBooked: true,
          },
        },
      },
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
        comment: r.comment,
      })),
      times: response.booked.map((b) => JSON.parse(b.times)),
      seatsBooked: response.booked.map((b) => JSON.parse(b.seatsBooked)),
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
                url_img: true,
              },
            },
          },
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
              },
            },
          },
        },
        genre: {
          select: {
            id: true,
            name: true,
          },
        },
        review: {
          select: {
            id: true,
            rating: true,
            comment: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        booked: {
          select: {
            times: true,
            seatsBooked: true,
          },
        },
      },
    });

    // delete file
    if (response.thumbnail) {
      await FileService.deleteFIleFormPath("thumbnails", response.thumbnail);
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
        comment: r.comment,
      })),
      times: response.booked.map((b) => JSON.parse(b.times)),
      seatsBooked: response.booked.map((b) => JSON.parse(b.seatsBooked)),
    });
  }

  // seats booked
  static async seatBooked(
    movieId: number,
    data: { times: string; seatsBooked: number[] }
  ): Promise<MovieResponseType | null> {
    // update
    const response = await prisma.booked.update({
      where: {
        movieId_times: {
          movieId,
          times: data.times,
        },
      },
      data: {
        seatsBooked: JSON.stringify(data.seatsBooked),
      },
      include: {
        movie: {
          include: {
            movieTheaters: {
              include: {
                theater: {
                  select: {
                    id: true,
                    name: true,
                    city: true,
                    img: true,
                    url_img: true,
                  },
                },
              },
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
                  },
                },
              },
            },
            genre: {
              select: {
                id: true,
                name: true,
              },
            },
            review: {
              select: {
                id: true,
                rating: true,
                comment: true,
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            booked: {
              select: {
                times: true,
                seatsBooked: true,
              },
            },
          },
        },
      },
    });

    // jika tidak ditemukan
    if (!response) return null;

    // ubah hasilnya ke MovieResponseType
    return toMovieResponse({
      ...response.movie,
      theaters: response.movie.movieTheaters.map((mt) => mt.theater),
      bonus: response.movie.movieBonus.map((mb) => mb.bonus),
      genres: response.movie.genre,
      reviews: response.movie.review.map((r) => ({
        id: r.id,
        username: r.user.name,
        rating: r.rating,
        comment: r.comment,
      })),
      times: response.movie.booked.map((b) => b.times),
      seatsBooked: response.movie.booked.map((b) => JSON.parse(b.seatsBooked)),
    });
  }

  // cek booked
  static async checkBooked(): Promise<BookedResponseType[] | null> {
    // get response
    const response = await prisma.booked.findMany({
      select: {
        id: true,
        movieId: true,
        times: true,
        seatsBooked: true,
      },
    });
    // return response
    return response.map((b) => ({
      ...b,
      seatsBooked: JSON.parse(b.seatsBooked),
    }));
  }

  // check booked with movie id & times
  static async checkBookedWithMovieId(
    movieId: number,
    times: string
  ): Promise<BookedResponseType | null> {
    // get response
    const response = await prisma.booked.findUnique({
      where: {
        movieId_times: {
          movieId,
          times,
        },
      },
      select: {
        id: true,
        movieId: true,
        times: true,
        seatsBooked: true,
      },
    });
    // return response
    if (!response) return null;
    return toBookedResponse({
      ...response,
      seatsBooked: JSON.parse(response.seatsBooked),
    });
  }
}
