import { prisma } from "../lib/prisma";
import { BookedResponseType, toBookedResponse } from "../models/booked-model";

export class BookedService {
  // get booked by movie id
  static async getBookedByMovieId(
    id: number,
    times: string
  ): Promise<BookedResponseType | null> {
    // get response
    const response = await prisma.booked.findFirstOrThrow({
      where: {
        movieId: id,
        times,
      },
      select: {
        id: true,
        movieId: true,
        times: true,
        seatsBooked: true,
      },
    });
    // return response
    return toBookedResponse({
      ...response,
      seatsBooked: JSON.parse(response.seatsBooked),
    });
  }

  //   update seatsbooked by movie id & times
  static async updateSeatsBooked(
    id: number,
    times: string,
    seatsBooked: number[]
  ): Promise<BookedResponseType | null> {
    // get response
    const response = await prisma.booked.update({
      where: {
        id,
      },
      data: {
        seatsBooked: JSON.stringify(seatsBooked),
      },
    });

    // return response
    return toBookedResponse({
      ...response,
      seatsBooked: JSON.parse(response.seatsBooked),
    });
  }
}
