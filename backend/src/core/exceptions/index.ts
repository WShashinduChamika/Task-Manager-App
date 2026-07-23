export interface AppError extends Error {
  statusCode?: number;
  code?: string;
  details?: unknown;
}

export const notFound = (message: string): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = 404;
  error.code = "NOT_FOUND";
  return error;
};

export const validationError = (
  message: string,
  details?: unknown,
): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = 400;
  error.code = "VALIDATION_ERROR";
  error.details = details;
  return error;
};

export const badRequest = (message: string): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = 400;
  error.code = "BAD_REQUEST";
  return error;
};

export const conflict = (message: string): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = 409;
  error.code = "CONFLICT";
  return error;
};

export const unauthorized = (message = "Unauthorized"): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = 401;
  error.code = "UNAUTHORIZED";
  return error;
};

export const forbidden = (message = "Forbidden"): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = 403;
  error.code = "FORBIDDEN";
  return error;
};
