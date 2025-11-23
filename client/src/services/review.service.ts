import api from "../lib/axios";
import type {
  ReviewCreateType,
  ReviewResponseType,
} from "../models/review-model";
import type { ResponseType } from "../types/types";

export class ReviewService {
  // create
  static async create(
    data: ReviewCreateType
  ): Promise<ResponseType<ReviewResponseType | null>> {
    // call api
    const response = api.post("/review/create", data).then((res) => res.data);

    // return
    return response;
  }
}
