import z, { ZodType } from "zod";
import { LoginRequest } from "../models/auth-model";

export class AuthValidation {
    // create 
    static readonly LOGIN = z.object({
        email: z.email("email tidak valid"),
        password: z.string({
            error: (val) => val.input === undefined ? "password harus diisi" : "password harus berupa string",
        }),
    }).strict() as ZodType<LoginRequest>
}