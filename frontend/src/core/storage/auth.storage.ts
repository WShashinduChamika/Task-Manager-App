const AUTH_TOKEN_KEY = "task_app_auth_token";
const AUTH_USER_KEY = "task_app_auth_user";

export const getAuthToken = (): string | null => {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setAuthToken = (token: string): void => {
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (e) {
    console.error("Failed to write auth token to localStorage", e);
  }
};

export const clearAuthToken = (): void => {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (e) {
    console.error("Failed to clear auth token from localStorage", e);
  }
};

export const getAuthUser = <T>(): T | null => {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

export const setAuthUser = <T>(user: T): void => {
  try {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error("Failed to write auth user to localStorage", e);
  }
};

export const clearAuthUser = (): void => {
  try {
    localStorage.removeItem(AUTH_USER_KEY);
  } catch (e) {
    console.error("Failed to clear auth user from localStorage", e);
  }
};
