import z, { ZodType } from "zod";
import type { TheaterCreateType, TheaterUpdateType } from "../models/theater-model";

export class TheaterValidation {
    // create 
    static readonly CREATE = z.object({
        name: z.string().nonempty('Name is required'),
        city: z.string().nonempty('City is required'),
        img: z.instanceof(File).refine((file) => file.size > 0, 'Image is required')
    }).strict() satisfies ZodType<TheaterCreateType>


    // update
    static readonly UPDATE = z.object({
        name: z.string().min(1, 'Name is required').optional(),
        city: z.string().min(1, 'City is required').optional(),
        img: z.instanceof(File).refine((file) => file.size > 0, 'Image is required').optional()
    }).strict() satisfies ZodType<TheaterUpdateType>
}