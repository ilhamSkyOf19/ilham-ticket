import z, { ZodType } from "zod";
import { UserCreateType, UserUpdateType } from "../models/user-model";

export class UserValidation {
    // create 
    static readonly CREATE = z.object({
        name: z.string({
            error: (val) => val.input === undefined ? "name harus diisi" : "name harus berupa string",
        }),
        email: z.email("email tidak valid"),
        password: z.string({
            error: (val) => val.input === undefined ? "password harus diisi" : "password harus berupa string",
        }),
        role: z.enum(["admin", "customer"], {
            error: (val) => val.input === undefined ? "role harus diisi" : "role tidak valid",
        }),
    }).strict() as ZodType<Omit<UserCreateType, "avatar">>

    // update
    static readonly UPDATE = z.object({
        name: z.string({
            error: (val) => val.input === undefined ? "name harus diisi" : "name harus berupa string",
        }).min(3, "name minimal 1 karakter").optional(),

        email: z.email("email tidak valid").optional(),

        password: z.string({
            error: (val) => val.input === undefined ? "password harus diisi" : "password harus berupa string",
        }).min(6, "password minimal 6 karakter").optional(),

        role: z.enum(["admin", "customer"], {
            error: (val) => val.input === undefined ? "role harus diisi" : "role tidak valid",
        }).optional(),
    }).strict() as ZodType<Omit<UserUpdateType, "avatar">>
}