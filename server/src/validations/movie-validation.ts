import z, { ZodType } from "zod";
import { MovieCreateType } from "../models/movie-model";

export class MovieValidation {
    // create 
    static readonly CREATE = z.object({
        title: z.string({
            error: (val) => val.input === undefined ? "title harus diisi" : "title harus berupa string",
        }),
        description: z.string({
            error: (val) => val.input === undefined ? "description harus diisi" : "description harus berupa string",
        }),
        price: z.number({
            error: (val) => val.input === undefined ? "price harus diisi" : "price harus berupa number",
        }),
        available: z.boolean({
            error: (val) => val.input === undefined ? "available harus diisi" : "available harus berupa boolean",
        }),
        bonus: z.string({
            error: (val) => val.input === undefined ? "bonus harus diisi" : "bonus harus berupa string",
        }),
        genreId: z.number({
            error: (val) => val.input === undefined ? "genreId harus diisi" : "genreId harus berupa number",
        }),
        theaterId: z.number({
            error: (val) => val.input === undefined ? "theaterId harus diisi" : "theaterId harus berupa number",
        }),
    }).strict() as ZodType<Omit<MovieCreateType, "thumbnail">>
}