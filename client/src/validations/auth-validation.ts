import z, { ZodType } from 'zod'
import type { SignType } from '../models/auth-model'
export class AuthValidation {

    // sign in
    static readonly SIGN_IN = z.object({
        email: z.email('email tidak valid').nonempty('Email is required'),
        password: z.string('password tidak valid').nonempty('Password is required')
    }).strict() satisfies ZodType<SignType>
}