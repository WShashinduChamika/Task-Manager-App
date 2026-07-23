import { api } from "@core/api";
import type { RegisterDto, AuthResponse } from "../types";

export const registerApi = async (dto: Omit<RegisterDto, "confirmPassword">): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/register", dto);
  return data;
};
