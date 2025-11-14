import { prisma } from "../lib/prisma";
import { SeatsResponseType, toSeatsResponse } from "../models/seats-model";

export class SeatsService {
  // read seats by movie
  static async readByMovieId(id: number): Promise<SeatsResponseType | null> {
    // get data
    const response = await prisma.movie.findFirstOrThrow({
      where: {
        id: id,
      },
      select: {
        id: true,
        seats: true,
        price: true,
        url_thumbnail: true,
      },
    });

    // return response
    return toSeatsResponse({
      movieId: response.id,
      price: response.price,
      seat: response.seats,
      url_thumbnail: response.url_thumbnail,
    });
  }
}
