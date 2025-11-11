import z, { ZodType } from "zod";
import type { BonusCreateType, BonusUpdateType } from "../models/bonus-model";

export class BonusValidation {
    // create 
    static readonly CREATE = z.object({
        name: z.string().nonempty('Name is required'),
        size: z.string().nonempty('Size is required'),
        img: z.instanceof(File).refine((file) => file.size > 0, 'Image is required')
    }).strict() satisfies ZodType<BonusCreateType>

    // update 
    static readonly UPDATE = z.object({
        name: z.string().min(1, 'Name is required').optional(),
        size: z.string().min(1, 'Size is required').optional(),
        img: z.instanceof(File).refine((file) => file.size > 0, 'Image is required').optional()
    }).strict() satisfies ZodType<BonusUpdateType>
}