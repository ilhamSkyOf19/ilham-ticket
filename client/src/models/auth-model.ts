export type SignUpType = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}


export type SignInType = Omit<SignUpType, 'name' | 'confirmPassword'>;
