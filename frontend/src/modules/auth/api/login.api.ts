import { api } from "@core/api";
import type { LoginDto, AuthResponse } from "../types";

export const loginApi = async (dto: LoginDto): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/login", dto);
  return data;
};
