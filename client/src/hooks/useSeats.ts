import { SeatsService } from "../services/seats.service";

// read seats by movie
export const useReadSeatsByMovieId = async (id: number) => {
  try {
    // get service
    const response = await SeatsService.readByMovieId(id);

    // cek response
    if (!response) {
      return null;
    }

    // return
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
