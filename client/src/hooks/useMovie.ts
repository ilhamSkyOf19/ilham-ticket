import { MovieService } from "../services/movie.service";

// read
export const useReadMovie = async () => {
  try {
    // get service
    const movies = await MovieService.read();

    // cek movies
    if (!movies) {
      return [];
    }

    // return movies
    return movies;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// read detail
export const useReadMovieDetail = async (id: number) => {
  try {
    // get service
    const movie = await MovieService.readDetail(id);

    // cek movie
    if (!movie) {
      return null;
    }

    // return movie
    return movie;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// read highlight
export const useReadHighlight = async () => {
  try {
    // call service
    const response = await MovieService.readHighlight();

    // cek response
    if (!response) return;

    // return
    return response;
  } catch (error) {
    console.log(error);
  }
};
