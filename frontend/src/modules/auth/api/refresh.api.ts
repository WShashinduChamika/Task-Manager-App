import { api } from "@core/api";
import { unwrapApiResponse } from "@core/api/response";
import type { RefreshTokenResponse } from "../types";

export const refreshTokenApi = async (
  refreshToken: string,
): Promise<RefreshTokenResponse> => {
  const response = await api.post("/auth/refresh-token", { refreshToken });
  return unwrapApiResponse<RefreshTokenResponse>(response);
};

