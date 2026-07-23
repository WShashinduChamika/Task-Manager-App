/** Discriminated union of all API response shapes */
export type ApiResponse<T> =
  | { success: true; data: T }
  | ApiErrorBody;

/** Shape of an error response envelope */
export interface ApiErrorBody {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

