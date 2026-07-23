import { toast } from "sonner";
import { getApiErrorMessage } from "@core/api/response";
import {
  authLoadingStore,
  authErrorStore,
  authSuccessMessageStore,
} from "./auth.store";
import { globalAuthUserStore } from "@store/auth.store";
import { loginApi } from "../api/login.api";
import { registerApi } from "../api/register.api";
import {
  setAuthToken,
  setAuthUser,
  clearAuthToken,
  clearAuthUser,
} from "@core/storage/auth.storage";
import type { LoginDto, RegisterDto } from "../types";

export const loginAction = async (dto: LoginDto): Promise<boolean> => {
  authLoadingStore.value = true;
  authErrorStore.value = null;

  try {
    const { accessToken, user } = await loginApi(dto);

    setAuthToken(accessToken);
    setAuthUser(user);

    globalAuthUserStore.value = user;
    toast.success(`Welcome back, ${user.name}!`);
    return true;
  } catch (err) {
    const errorMessage = getApiErrorMessage(
      err,
      "Login failed. Please check your credentials.",
    );
    authErrorStore.value = errorMessage;
    toast.error(errorMessage);
    return false;
  } finally {
    authLoadingStore.value = false;
  }
};

export const registerAction = async (dto: RegisterDto): Promise<boolean> => {
  authLoadingStore.value = true;
  authErrorStore.value = null;
  authSuccessMessageStore.value = null;

  try {
    const { accessToken, user } = await registerApi({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });

    setAuthToken(accessToken);
    setAuthUser(user);

    globalAuthUserStore.value = user;
    toast.success(`Account created! Welcome, ${user.name}.`);
    return true;
  } catch (err) {
    const errorMessage = getApiErrorMessage(
      err,
      "Registration failed. Please try again.",
    );
    authErrorStore.value = errorMessage;
    toast.error(errorMessage);
    return false;
  } finally {
    authLoadingStore.value = false;
  }
};

export const logoutAction = (): void => {
  clearAuthToken();
  clearAuthUser();
  globalAuthUserStore.value = null;
  toast.info("Logged out successfully.");
};


export const hydrateAuthAction = (): void => {
  try {
    const raw = localStorage.getItem("task_app_auth_user");
    const token = localStorage.getItem("task_app_auth_token");

    if (raw && token) {
      globalAuthUserStore.value = JSON.parse(raw);
    }
  } catch {}
};

export const clearAuthErrorAction = (): void => {
  authErrorStore.value = null;
};
