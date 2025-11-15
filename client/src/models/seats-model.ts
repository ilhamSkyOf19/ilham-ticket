// read seats
export type SeatsResponseType = {
  movieId: number;
  seat: number;
  seatsBooked: number[];
  price: number;
  url_thumbnail: string;
};

// to response
export const toSeatsResponse = (
  seats: SeatsResponseType
): SeatsResponseType => {
  return {
    movieId: seats.movieId,
    seat: seats.seat,
    seatsBooked: seats.seatsBooked,
    price: seats.price,
    url_thumbnail: seats.url_thumbnail,
  };
};
