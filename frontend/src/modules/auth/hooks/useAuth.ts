import {
  loginAction,
  registerAction,
  logoutAction,
  clearAuthErrorAction,
} from "../store/auth.actions";
import {
  authLoadingStore,
  authErrorStore,
  authSuccessMessageStore,
} from "../store/auth.store";
import { globalAuthUserStore, isLoggedInStore } from "@store/auth.store";

export const useAuth = () => ({
  user: globalAuthUserStore,
  isLoggedIn: isLoggedInStore,
  isLoading: authLoadingStore,
  error: authErrorStore,
  successMessage: authSuccessMessageStore,

  login: loginAction,
  register: registerAction,
  logout: logoutAction,
  clearError: clearAuthErrorAction,
});
