import bcrypt from "bcryptjs";
import type { UserModel } from "../../../generated/prisma/models/User";
import { conflict, unauthorized } from "../../core/exceptions";
import { generateAccessToken } from "../../core/utils/jwt";
import * as repository from "./auth.repository";
import type { LoginDto, RegisterDto } from "./dto";

export type UserResponse = Omit<UserModel, "password">;

export interface AuthResponse {
  user: UserResponse;
  accessToken: string;
}

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

  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
  });

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, accessToken };
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

  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
  });

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, accessToken };
};
