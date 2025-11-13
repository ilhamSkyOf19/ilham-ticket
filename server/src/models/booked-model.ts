import { Booked } from "../../generated/prisma";

export type BookedCreateType = {
  movieId: number;
  seatsBooked: number[];
  times: string;
};

export type BookedUpdateType = {
  seatsBooked: number[];
};

// response
export type BookedResponseType = {
  id: number;
  movieId: number;
  times: string;
  seatsBooked: number[];
};

// to response
export const toBookedResponse = (
  booked: Booked & { seatsBooked: number[] }
): BookedResponseType => {
  return {
    id: booked.id,
    movieId: booked.movieId,
    times: booked.times,
    seatsBooked: booked.seatsBooked,
  };
};
