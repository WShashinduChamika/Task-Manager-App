import type { AxiosResponse } from "axios";
import type { ApiErrorBody, ApiResponse } from "./types";
import axios from "axios";

export class ApiRequestError extends Error {
  readonly code: ApiErrorBody["error"]["code"];
  readonly apiMessage: string;

  constructor(error: ApiErrorBody["error"]) {
    super(error.message);
    this.name = "ApiRequestError";
    this.code = error.code;
    this.apiMessage = error.message;
  }
}

export const unwrapApiResponse = <T>(
  response: AxiosResponse<ApiResponse<T>>,
): T => {
  const body = response.data;

  if (body.success) {
    return body.data;
  }

  throw new ApiRequestError(body.error);
};

export const getApiErrorMessage = (err: unknown, fallback: string): string => {
  if (axios.isAxiosError(err)) {
    const message =
      err.response?.data?.error?.message || err.response?.data?.message;
    console.log(message);
    if (typeof message === "string") return message;
    if (Array.isArray(message)) return message[0] ?? fallback;
  }
  if (err instanceof Error) return err.message;
  return fallback;
};
