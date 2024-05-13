import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

type Token = {
  userId: number;
  isAdmin: boolean;
};

class Auth {
  private jwt = jwt;

  public getToken(userId: number, isAdmin: boolean): string {
    const payload: Token = {
      userId,
      isAdmin,
    };

    const token: string =
      "Bearer " +
      this.jwt.sign(payload, config.jwt.SecretKey, {
        expiresIn: config.jwt.ExpiresIn,
      });

    return token;
  }

  public verifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const authorization = req.cookies.Authorization;

    if (!authorization) {
      res.status(400).json({
        message: "로그인 먼저 해주세요.",
      });
      return;
    }

    const token: string = authorization?.split(" ")[1];

    const payload = this.decodeToken(token);

    if (payload === null) {
      res.status(400).json({
        message: "재 로그인 후 시도해주세요.",
      });
      return;
    }

    res.locals.userId = payload?.userId;
    res.locals.isAdmin = payload?.isAdmin;

    next();
  };

  public decodeToken = (token: string): any => {
    try {
      const payload: any = jwt.verify(token, config.jwt.SecretKey);
      return payload;
    } catch (e) {
      console.error(e);
      return null;
    }
  };
}

const auth = new Auth();

export default auth;
