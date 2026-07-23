import { api } from "@core/api";

export const logoutApi = async (refreshToken?: string): Promise<void> => {
  try {
    if (refreshToken) {
      await api.post("/auth/logout", { refreshToken });
    }
  } catch (e) {
    console.error("Backend logout failed:", e);
  }
};
