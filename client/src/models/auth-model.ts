
// sign up type
export type SignUpType = {
    name: string;
    email: string;
    password: string;
}

// response sign up type
export type SignResponseType = Omit<SignUpType, 'password'> & {
    id: string;
    role: 'customer' | 'admin';
}




// sign in type
export type SignInType = Omit<SignUpType, 'name' | 'confirmPassword'>;
