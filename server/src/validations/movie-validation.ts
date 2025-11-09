import z, { ZodType } from "zod";
import { MovieCreateType, MovieUpdateType } from "../models/movie-model";

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
        genreId: z.number({
            error: (val) => val.input === undefined ? "genreId harus diisi" : "genreId harus berupa number",
        }),
        bonus: z.string()
            .transform((val) => {
                try {
                    return JSON.parse(val);
                } catch {
                    throw new Error("bonus harus berupa JSON array valid");
                }
            })
            .refine(
                (arr) => Array.isArray(arr) && arr.every((n) => typeof n === "number"),
                "bonus harus berupa array berisi number"
            ),
        theaterId: z.string()
            .transform((val) => {
                try {
                    return JSON.parse(val);
                } catch {
                    throw new Error("theaterId harus berupa JSON array valid");
                }
            })
            .refine(
                (arr) => Array.isArray(arr) && arr.every((n) => typeof n === "number"),
                "theaterId harus berupa array berisi number"
            )

    }).strict() satisfies ZodType<Omit<MovieCreateType, 'thumbnail' | 'theaterId'> & { theaterId: string }>


    // upadte 
    static readonly UPDATE = z.object({
        title: z.string({
            error: (val) => val.input === undefined ? "title harus diisi" : "title harus berupa string",
        }).min(3, "title minimal 1 karakter").optional(),
        description: z.string({
            error: (val) => val.input === undefined ? "description harus diisi" : "description harus berupa string",
        }).min(3, "description minimal 1 karakter").optional(),
        price: z.number({
            error: (val) => val.input === undefined ? "price harus diisi" : "price harus berupa number",
        }).optional(),
        available: z.boolean({
            error: (val) => val.input === undefined ? "available harus diisi" : "available harus berupa boolean",
        }).optional(),
        genreId: z.number({
            error: (val) => val.input === undefined ? "genreId harus diisi" : "genreId harus berupa number",
        }).optional(),
        bonus: z.string()
            .transform((val) => {
                try {
                    return JSON.parse(val);
                } catch {
                    throw new Error("bonus harus berupa JSON array valid");
                }
            })
            .refine(
                (arr) => Array.isArray(arr) && arr.every((n) => typeof n === "number"),
                "bonus harus berupa array berisi number"
            ).optional(),
        theaterId: z.string()
            .transform((val) => {
                try {
                    return JSON.parse(val);
                } catch {
                    throw new Error("theaterId harus berupa JSON array valid");
                }
            })
            .refine(
                (arr) => Array.isArray(arr) && arr.every((n) => typeof n === "number"),
                "theaterId harus berupa array berisi number"
            ).optional()


    }).strict() as ZodType<Omit<MovieUpdateType, "thumbnail">>

}