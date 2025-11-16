// sign up type
export type SignUpType = {
  name: string;
  email: string;
  password: string;
};

// response sign up type
export type SignResponseType = Omit<SignUpType, "password"> & {
  id: number;
  role: "customer" | "admin";
  avatar: string;
  url_avatar: string;
};

// sign in type
export type SignInType = Omit<SignUpType, "name" | "confirmPassword">;
