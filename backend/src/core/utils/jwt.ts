import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
  email: string;
}

const getJwtSecret = (): string => {
  return (
    process.env.JWT_SECRET || "default_jwt_secret_key_change_in_production"
  );
};

const getRefreshSecret = (): string => {
  return process.env.JWT_REFRESH_SECRET || getJwtSecret();
};

const getJwtExpiresIn = (): string => {
  return process.env.JWT_EXPIRES_IN || "1d";
};

const getRefreshExpiresIn = (): string => {
  return process.env.JWT_REFRESH_EXPIRES_IN || "7d";
};

export const generateAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: getJwtExpiresIn() as jwt.SignOptions["expiresIn"],
  });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, getJwtSecret()) as JwtPayload;
};

export const generateRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, getRefreshSecret(), {
    expiresIn: getRefreshExpiresIn() as jwt.SignOptions["expiresIn"],
  });
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, getRefreshSecret()) as JwtPayload;
};
