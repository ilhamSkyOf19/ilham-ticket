import { z, ZodType } from "zod";
import type { MovieCreateType } from "../models/movie-model";

export class MovieValidation {
    static readonly CREATE = z.object({
        title: z.string().min(1, "Title is required").trim(),

        about: z.string().min(1, "About is required").trim(),

        rating: z.string()
            .min(1, "Rating is required")
            .refine((val) => !isNaN(Number(val)), { message: "Rating must be a number" })
            .refine((val) => Number(val) >= 0 && Number(val) <= 5, { message: "Rating must be between 0 and 5" }),

        location: z.string().min(1, "Location is required").trim(),

        thumbnail: z.string().min(1, "Thumbnail is required").trim(),

        price: z.string()
            .min(1, "Price is required")
            .refine((val) => !isNaN(Number(val)), { message: "Price must be a number" }),

        genre: z.string()
            .min(1, "Genre is required")
            .refine((val) => !isNaN(Number(val)), { message: "Genre must be a number" }),

        theaters: z.array(
            z.number()
                .min(1, "Theater ID is required")
        ).min(1, "At least one theater is required"),

        bonus: z.array(
            z.number()
                .min(1, "Bonus ID is required")
        ).min(1, "At least one bonus is required"),
    })
        .strict() satisfies ZodType<MovieCreateType>;
}
