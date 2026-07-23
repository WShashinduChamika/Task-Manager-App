import { z } from "zod";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be at most 100 characters long"),
  email: z
    .string()
    .trim()
    .regex(EMAIL_REGEX, "Email must be a valid address")
    .toLowerCase(),
  password: z
    .string()
    .min(6, "Password must be at least 8 characters long")
    .max(128, "Password must be at most 128 characters long"),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .regex(EMAIL_REGEX, "Email must be a valid address")
    .toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export type RefreshTokenSchemaType = z.infer<typeof refreshTokenSchema>;

export const logoutSchema = z.object({
  refreshToken: z.string().optional(),
});

export type LogoutSchemaType = z.infer<typeof logoutSchema>;

