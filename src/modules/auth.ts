import prisma from "../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { User } from "../interfaces/IUser";
import { responseTemplate } from "../utils/responser";
import { r } from "@faker-js/faker/dist/airline-C5Qwd7_q";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const hashedPassword = (originalPassword: String) => {
  // hash is default async
  // hashSync is sync
  return bcrypt.hash(originalPassword, 5);
};

export const comparePassword = (
  originalPassword: String,
  hashedPassword: String
) => {
  return bcrypt.compare(originalPassword, hashedPassword);
};

export const generateJWT = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    JWT_SECRET
  );
  return token;
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization || null;
  if (!bearerToken) {
    responseTemplate({
      res,
      data: {},
      statusCode: 401,
      message: "Not Authorized",
    });
    return;
  }

  const [, token] = bearerToken.split(" ");
  if (!token) {
    responseTemplate({
      res,
      data: {},
      statusCode: 401,
      message: "Not valid token",
    });
    return;
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req["user"] = user;
    next();
  } catch (e) {
    console.error(e);
    responseTemplate({
      res,
      data: {},
      statusCode: 401,
      message: "Not valid token",
    });
    return;
  }
};
