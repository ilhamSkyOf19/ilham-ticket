import z, { ZodType } from "zod";
import type { ReviewCreateType } from "../models/review-model";

export class ReviewValidation {
  // create
  static readonly CREATE = z
    .object({
      comment: z.string().min(1, "comment is required").trim(),
      rating: z
        .number()
        .min(1, "rating is required")
        .max(5, "rating is required"),
    })
    .strict() satisfies ZodType<Omit<ReviewCreateType, "movieId">>;
}
