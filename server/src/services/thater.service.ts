import { prisma } from "../lib/prisma";
import { toMovieHighlightResponse } from "../models/movie-model";
import {
  TheaterCreateType,
  TheaterResponseType,
  TheaterUpdateType,
  TheaterWithMovieResponseType,
  toTheaterResponse,
} from "../models/theater-model";

export class TheaterService {
  // create
  static async create(
    req: TheaterCreateType & { img: string; url_img: string }
  ): Promise<TheaterResponseType | null> {
    // create genre
    const response = await prisma.theater.create({ data: req });

    // return genre
    return toTheaterResponse(response);
  }

  // read
  static async read(): Promise<TheaterResponseType[] | null> {
    // get genre
    const response = await prisma.theater.findMany();

    // return genre
    return response.map(toTheaterResponse);
  }

  // read detail
  static async readDetail(id: number): Promise<TheaterResponseType | null> {
    // get genre
    const response = await prisma.theater.findFirstOrThrow({ where: { id } });

    // return genre
    return toTheaterResponse(response);
  }

  // update
  static async update(
    id: number,
    req: TheaterUpdateType & { img?: string; url_img?: string }
  ): Promise<TheaterResponseType | null> {
    // update genre
    const response = await prisma.theater.update({ where: { id }, data: req });

    return toTheaterResponse(response);
  }

  // delete
  static async delete(id: number): Promise<TheaterResponseType | null> {
    // delete genre
    const response = await prisma.theater.delete({ where: { id } });

    // return genre
    return toTheaterResponse(response);
  }

  // read theaters with movie highlight
  static async readTheatersWithMovie(
    movieId: number
  ): Promise<TheaterWithMovieResponseType | null> {
    // get theaters with movie highlight
    const response = await prisma.theater.findMany({
      where: {
        movieTheaters: {
          some: {
            movieId: movieId,
          },
        },
      },
      include: {
        movieTheaters: {
          include: {
            movie: {
              select: {
                id: true,
                title: true,
                thumbnail: true,
                url_thumbnail: true,
                genre: {
                  select: {
                    name: true,
                  },
                },
                rating: true,
              },
            },
          },
        },
      },
    });

    // return theaters with movie highlight
    const movie = response[0].movieTheaters[0].movie;

    return {
      movie: toMovieHighlightResponse({
        id: movie.id,
        title: movie.title,
        thumbnail: movie.thumbnail,
        url_thumbnail: movie.url_thumbnail,
        genre: movie.genre.name,
        city: response[0].city,
        rating: movie.rating,
      }),
      theater: response.map((t) => ({
        id: t.id,
        img: t.img,
        url_img: t.url_img,
        name: t.name,
        city: t.city,
      })),
    };
  }
}
