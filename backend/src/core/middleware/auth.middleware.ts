import type { NextFunction, Request, Response } from "express";
import { unauthorized } from "../exceptions";
import { verifyAccessToken, type JwtPayload } from "../utils/jwt";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw unauthorized("Access token missing or malformed");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch {
    throw unauthorized("Invalid or expired access token");
  }
};
