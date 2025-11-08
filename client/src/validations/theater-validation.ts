import z, { ZodType } from "zod";
import type { TheaterCreateType } from "../models/theater-model";

export class TheaterValidation {
    // create 
    static readonly CREATE = z.object({
        name: z.string().nonempty('Name is required'),
        city: z.string().nonempty('City is required')
    }).strict() satisfies ZodType<TheaterCreateType>
}