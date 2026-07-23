import type { UserModel } from "../../../generated/prisma/models/User";
import type { RefreshTokenModel } from "../../../generated/prisma/models/RefreshToken";
import type { TokenStatus } from "../../../generated/prisma/enums";
import { getPrisma } from "../../core/database/prisma";

export const findByEmail = async (
  email: string,
): Promise<UserModel | null> => {
  const prisma = getPrisma();
  return prisma.user.findUnique({ where: { email } });
};

export const findById = async (
  id: string,
): Promise<UserModel | null> => {
  const prisma = getPrisma();
  return prisma.user.findUnique({ where: { id } });
};

export const create = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<UserModel> => {
  const prisma = getPrisma();
  return prisma.user.create({ data });
};

export const createRefreshToken = async (data: {
  userId: string;
  token: string;
  expiresAt: Date;
}): Promise<RefreshTokenModel> => {
  const prisma = getPrisma();
  return prisma.refreshToken.create({
    data: {
      userId: data.userId,
      token: data.token,
      expiresAt: data.expiresAt,
    },
  });
};

export const findRefreshToken = async (
  token: string,
): Promise<RefreshTokenModel | null> => {
  const prisma = getPrisma();
  return prisma.refreshToken.findUnique({ where: { token } });
};

export const updateRefreshTokenStatus = async (
  token: string,
  status: TokenStatus,
): Promise<RefreshTokenModel | null> => {
  const prisma = getPrisma();
  return prisma.refreshToken.update({
    where: { token },
    data: { status },
  });
};

