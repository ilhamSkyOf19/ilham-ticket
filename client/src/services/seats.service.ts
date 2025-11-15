import api from "../lib/axios";
import type { SeatsResponseType } from "../models/seats-model";
import type { ResponseType } from "../types/types";

export class SeatsService {
  // read seats by movie
  static async readByMovieId(
    id: number,
    time: string
  ): Promise<ResponseType<SeatsResponseType | null>> {
    const response = await api
      .get(`/seats/read-by-movie/${id}/${time}`)
      .then((res) => res.data);

    // return response data
    return response;
  }
}
