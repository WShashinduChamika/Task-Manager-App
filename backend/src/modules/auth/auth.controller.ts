import type { NextFunction, Request, Response } from "express";
import * as service from "./auth.service";
import { loginSchema, registerSchema, refreshTokenSchema, logoutSchema } from "./schemas/auth.schema";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const dto = registerSchema.parse(req.body);
    const result = await service.register(dto);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const dto = loginSchema.parse(req.body);
    const result = await service.login(dto);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const dto = refreshTokenSchema.parse(req.body);
    const result = await service.refreshToken(dto.refreshToken);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const dto = logoutSchema.parse(req.body);
    const token = dto.refreshToken ?? (req.body.token as string | undefined);
    const result = await service.logout(token);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

