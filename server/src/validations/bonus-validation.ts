import z, { ZodType } from "zod";
import { BonusCreateType, BonusUpdateType } from "../models/bonus-model";

export class BonusValidation {
    // create 
    static readonly CREATE = z.object({
        name: z.string({
            error: (val) => val.input === undefined ? "name harus diisi" : "name harus berupa string",
        }),
        size: z.string({
            error: (val) => val.input === undefined ? "size harus diisi" : "size harus berupa string",
        }),
    }).strict() as ZodType<BonusCreateType>


    // update
    static readonly UPDATE = z.object({
        name: z.string({
            error: (val) => val.input === undefined ? "name harus diisi" : "name harus berupa string",
        }).min(3, "name minimal 1 karakter").optional(),
        size: z.string({
            error: (val) => val.input === undefined ? "size harus diisi" : "size harus berupa string",
        }).min(3, "size minimal 1 karakter").optional(),
    }).strict() as ZodType<BonusUpdateType>
}