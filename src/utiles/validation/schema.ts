import z from "zod";

export const ROLE_LIST = ["Admin", "User", "Editor"] as const;

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Please provide a valid email"),
  password: z.string().min(1, { message: "Password is Required" }),
});

export const SigninSchema = z
  .object({
    email: z
      .string()
      .nonempty("Email is required")
      .email("Please provide a valid email"),
    password: z.string().min(4, { message: "Password is Required" }),
    confirmPassword: z.string().min(4, { message: "Password is Required" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const UserAddEditSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .nonempty("Name is required")
    .max(50, "Name should not exceed 50 characters"),

  email: z
    .string()
    .nonempty("Email is required")
    .email("Please provide a valid email"),
  phoneNumber: z.string(),
  // .regex(/^\d{10}$/, "Phone number must be 10 digits"), // Adjust regex based on your requirements
  role: z.string().nonempty("Role is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Minimum length is 6 characters"),
  // .refine((value) => ROLE_LIST.includes(value as any), {
  //   message: `Role must be one of: ${ROLE_LIST.join(", ")}`,
  // }),
  isActive: z.boolean().default(true),
});

export const RoleAddEditSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Role name is required"),
  permissions: z.array(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type SigninSchematype = z.infer<typeof SigninSchema>;
export type UserAddEditSchemaType = z.infer<typeof UserAddEditSchema>;
export type RoleAddEditSchemaType = z.infer<typeof RoleAddEditSchema>;
