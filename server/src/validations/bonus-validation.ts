import z, { ZodType } from "zod";
import { BonusCreateType } from "../models/bonus-model";

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
}