import z, { ZodType } from "zod";
import { TheaterCreateType, TheaterUpdateType } from "../models/theater-model";

export class TheaterValidation {
    // create 
    static readonly CREATE = z.object({
        name: z.string({
            error: (val) => val.input === undefined ? "name harus diisi" : "name harus berupa string",
        }),
        city: z.string({
            error: (val) => val.input === undefined ? "city harus diisi" : "city harus berupa string",
        }),
    }).strict() as ZodType<TheaterCreateType>

    // update 
    static readonly UPDATE = z.object({
        name: z.string({
            error: (val) => val.input === undefined ? "name harus diisi" : "name harus berupa string",
        }).min(3, "name minimal 1 karakter").optional(),
        city: z.string({
            error: (val) => val.input === undefined ? "city harus diisi" : "city harus berupa string",
        }).min(3, "city minimal 1 karakter").optional(),
    }).strict() as ZodType<TheaterUpdateType>
}