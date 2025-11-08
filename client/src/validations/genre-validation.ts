import z, { ZodType } from "zod";
import type { GenreCreateType } from "../models/genre-model";

export class GenreValidation {
    // create 
    static readonly CREATE = z.object({
        name: z.string().nonempty('Name is required')
    }).strict() satisfies ZodType<GenreCreateType>
}