import type { UserModel } from "../../../generated/prisma/models/User";
import { getPrisma } from "../../core/database/prisma";

export const findByEmail = async (
  email: string,
): Promise<UserModel | null> => {
  const prisma = getPrisma();
  return prisma.user.findUnique({ where: { email } });
};

export const create = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<UserModel> => {
  const prisma = getPrisma();
  return prisma.user.create({ data });
};
