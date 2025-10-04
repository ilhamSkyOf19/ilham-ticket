import z, { ZodType } from 'zod'
import type { SignInType, SignUpType } from '../models/auth-model'
export class AuthValidation {

    // sign in
    static readonly SIGN_IN = z.object({
        email: z.email('email tidak valid')
            .nonempty('Email is required'),
        password: z.string('password tidak valid')
            .nonempty('Password is required')
            .min(6, 'Password minimal 6 karakter')
    }).strict() satisfies ZodType<SignInType>


    // sign up 
    static readonly SIGN_UP = z.object({
        name: z.string()
            .min(3, 'Name minimal 3 karakter')
            .max(50, 'Name maksimal 50 karakter')
            .nonempty('Name is required'),
        password: z.string()
            .min(6, 'Password minimal 6 karakter')
            .max(50, 'Password maksimal 50 karakter')
            .nonempty('Password is required'),
        email: z.email('Email tidak valid')
            .nonempty('Email is required'),
        confirmPassword: z.string()
            .min(6, 'Confirm Password minimal 6 karakter')
            .max(50, 'Confirm Password maksimal 50 karakter')
            .nonempty('Confirm Password is required'),
    }).strict() satisfies ZodType<SignUpType>
}