import bcrypt from "bcryptjs";
import type { UserModel } from "../../../generated/prisma/models/User";
import { conflict, unauthorized } from "../../core/exceptions";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../core/utils/jwt";
import * as repository from "./auth.repository";
import type { LoginDto, RegisterDto } from "./dto";

export type UserResponse = Omit<UserModel, "password">;

export interface AuthResponse {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

const issueTokens = async (user: UserModel): Promise<{ accessToken: string; refreshToken: string }> => {
  const payload = { userId: user.id, email: user.email };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  await repository.createRefreshToken({
    userId: user.id,
    token: refreshToken,
    expiresAt,
  });

  return { accessToken, refreshToken };
};

export const register = async (dto: RegisterDto): Promise<AuthResponse> => {
  const existingUser = await repository.findByEmail(dto.email);
  if (existingUser) {
    throw conflict("User with this email already exists");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(dto.password, saltRounds);

  const user = await repository.create({
    name: dto.name,
    email: dto.email,
    password: hashedPassword,
  });

  const { accessToken, refreshToken } = await issueTokens(user);

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, accessToken, refreshToken };
};

export const login = async (dto: LoginDto): Promise<AuthResponse> => {
  const user = await repository.findByEmail(dto.email);
  if (!user) {
    throw unauthorized("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(dto.password, user.password);
  if (!isPasswordValid) {
    throw unauthorized("Invalid email or password");
  }

  const { accessToken, refreshToken } = await issueTokens(user);

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, accessToken, refreshToken };
};

export const refreshToken = async (token: string): Promise<RefreshTokenResponse> => {
  let payload: { userId: string; email: string };
  try {
    payload = verifyRefreshToken(token);
  } catch {
    throw unauthorized("Invalid or expired refresh token");
  }

  const tokenRecord = await repository.findRefreshToken(token);
  if (!tokenRecord) {
    throw unauthorized("Refresh token not found");
  }

  if (tokenRecord.status !== "ACTIVE") {
    throw unauthorized("Refresh token has been revoked or expired");
  }

  if (new Date() > tokenRecord.expiresAt) {
    await repository.updateRefreshTokenStatus(token, "EXPIRED");
    throw unauthorized("Refresh token has expired");
  }

  const user = await repository.findById(payload.userId);
  if (!user) {
    throw unauthorized("User not found");
  }

  // Revoke previous refresh token upon rotation
  await repository.updateRefreshTokenStatus(token, "REVOKED");

  // Issue new token pair
  return issueTokens(user);
};

export const logout = async (token?: string): Promise<{ message: string }> => {
  if (token) {
    const tokenRecord = await repository.findRefreshToken(token);
    if (tokenRecord) {
      await repository.updateRefreshTokenStatus(token, "REVOKED");
    }
  }
  return { message: "Logged out successfully" };
};

