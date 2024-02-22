import { Request, Response, NextFunction } from "express";
import { Payload } from "../model/interface/payload/payload";
import { verify } from "jsonwebtoken";

export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.sendStatus(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

    request.user_id = sub;
    return next();
  } catch (error) {
    return response.sendStatus(401).end();
  }
}
