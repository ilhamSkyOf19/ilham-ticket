import { prisma } from "../lib/prisma";
import { SeatsResponseType, toSeatsResponse } from "../models/seats-model";

export class SeatsService {
  // read seats by movie
  static async readByMovieId(
    id: number,
    time: string
  ): Promise<SeatsResponseType | null> {
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
        booked: {
          where: {
            times: time,
          },
          select: {
            seatsBooked: true,
            times: true,
          },
        },
      },
    });

    // Jika tidak ada booked , return null
    if (!response.booked || response.booked.length === 0) {
      return null;
    }

    // Ambil booked seats dari record pertama
    const seatsBooked = JSON.parse(response.booked[0].seatsBooked);

    return toSeatsResponse({
      movieId: response.id,
      price: response.price,
      seat: response.seats,
      seatsBooked: seatsBooked,
      url_thumbnail: response.url_thumbnail,
    });
  }
}
