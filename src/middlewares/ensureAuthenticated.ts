import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if(!authHeader) {
    throw new AppError("Token invalid!", 401)
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, "ecab09c93eb09c2d2eb13449044fd4e3") as IPayload;
    const { sub: user_id } = decoded;

    const userRepository = new UsersRepository();
    const user = await userRepository.findById(user_id);

    if(!user) {
      throw new AppError("User does not exists!", 401)
    }
    
    next();
  } catch {
    throw new AppError("Token invalid!", 401);
  }

}