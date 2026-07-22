import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
  email: string;
}

const getJwtSecret = (): string => {
  return process.env.JWT_SECRET || "default_jwt_secret_key_change_in_production";
};

const getJwtExpiresIn = (): string => {
  return process.env.JWT_EXPIRES_IN || "1d";
};

export const generateAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: getJwtExpiresIn() as jwt.SignOptions["expiresIn"],
  });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, getJwtSecret()) as JwtPayload;
};
