import z, { ZodType } from "zod";

export class UserValidation {
  // avatar
  static readonly UPDATE_AVATAR = z
    .object({
      avatar: z
        .instanceof(File)
        .refine((file) => file.size > 0, "Image is required"),
    })
    .strict() satisfies ZodType<{ avatar: File }>;
}
