import z, { ZodType } from "zod";
import { ReviewCreateType } from "../models/review-model";

export class ReviewValidation {
    // create 
    static readonly CREATE = z.object({
        comment: z.string({
            error: (val) => val.input === undefined ? "comment harus diisi" : "comment harus berupa string",
        }),
        rating: z.number({
            error: (val) => val.input === undefined ? "rating harus diisi" : "rating harus berupa angka",
        }).min(1, "rating minimal 1").max(5, "rating maksimal 5"),
        movieId: z.number({
            error: (val) => val.input === undefined ? "movieId harus diisi" : "movieId harus berupa angka",
        }),
    }).strict() as ZodType<Omit<ReviewCreateType, "username">>
}