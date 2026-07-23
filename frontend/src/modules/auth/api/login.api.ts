import { api } from "@core/api";
import { unwrapApiResponse } from "@core/api/response";
import type { ApiResponse } from "@core/api/types";
import type { LoginDto, AuthResponse } from "../types";

export const loginApi = async (dto: LoginDto): Promise<AuthResponse> => {
  const response = await api.post<ApiResponse<AuthResponse>>("/auth/login", dto);
  return unwrapApiResponse(response);
};

