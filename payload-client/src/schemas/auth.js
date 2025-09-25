import { z } from "zod";

// Email only for SSO flow
export const emailOnlySchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

// Password validation
export const passwordOnlySchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

// Full login schema
export const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

// Registration schema
export const registerSchema = z
  .object({
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

// Utility validator for consistent error handling
export function validate(schema, values) {
  const result = schema.safeParse(values);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors = result.error.format();
  const flatErrors = Object.fromEntries(
    Object.entries(errors).map(([field, val]) => [field, val?._errors ?? []])
  );

  return { success: false, errors: flatErrors };
}
