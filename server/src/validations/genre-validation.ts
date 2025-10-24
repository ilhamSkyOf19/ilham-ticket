import zod, { ZodType } from "zod";
import { GenreCreateType, GenreUpdateType } from "../models/genre-model";
export class GenreValidation {

    // create 
    static readonly CREATE = zod.object({
        name: zod.string({
            error: (val) => val.input === undefined ? "name harus diisi" : "name harus berupa string",
        }),
    }).strict() as ZodType<GenreCreateType>


    // update 
    static readonly UPDATE = zod.object({
        name: zod.string({
            error: (val) => val.input === undefined ? "name harus diisi" : "name harus berupa string",
        })
            .min(3, "name minimal 1 karakter")
            .optional(),
    }).strict() as ZodType<GenreUpdateType>
}