import { z, ZodType } from "zod";
import type { MovieCreateType } from "../models/movie-model";

export class MovieValidation {
    static readonly CREATE = z.object({
        title: z.string().min(1, "Title is required").trim(),

        description: z.string().min(1, "Description is required").trim(),

        thumbnail: z
            .instanceof(File)
            .refine((file) => file.size > 0, "Thumbnail is required"),

        price: z.string()
            .min(1, "Price is required")
            .refine((val) => !isNaN(Number(val)), { message: "Price must be a number" }),

        genreId: z.string()
            .min(1, "Genre is required")
            .refine((val) => !isNaN(Number(val)), { message: "Genre must be a number" }),

        theaterId: z.array(
            z.number()
                .min(1, "Theater ID is required")
        ).min(1, "At least one theater is required"),

        bonus: z.array(
            z.number()
                .min(1, "Bonus ID is required")
        ).min(1, "At least one bonus is required"),
    })
        .strict() satisfies ZodType<Omit<MovieCreateType, "available">>;
}
