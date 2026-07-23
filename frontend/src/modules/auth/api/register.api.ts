import { api } from "@core/api";
import { unwrapApiResponse } from "@core/api/response";
import type { ApiResponse } from "@core/api/types";
import type { RegisterDto, AuthResponse } from "../types";

export const registerApi = async (dto: Omit<RegisterDto, "confirmPassword">): Promise<AuthResponse> => {
  const response = await api.post<ApiResponse<AuthResponse>>("/auth/register", dto);
  return unwrapApiResponse(response);
};

