import prisma from "../db";
import { Request, Response } from "express";
import { comparePassword, generateJWT, hashedPassword } from "../modules/auth";
import { responseTemplate } from "../utils/responser";

export const createNewUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const existingUser = await prisma.user.findFirst({ where: { username } });
  if (existingUser) {
    responseTemplate({
      res,
      message: "User already exists",
      statusCode: 409,
      data: [],
    });
  }
  const user = await prisma.user.create({
    data: {
      username: username,
      password: await hashedPassword(password),
    },
  });
  const token = generateJWT(user);
  responseTemplate({
    res,
    message: "Created users successfully",
    statusCode: 200,
    data: {
      token,
    },
  });
};

export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  if (!user) {
    res.status(404);
    res.json({ message: "Invalid username" });
  }
  const hashedPassword = user.password;
  const isMatch = await comparePassword(password, hashedPassword);
  if (!isMatch) {
    responseTemplate({
      res,
      statusCode: 401,
      message: "Incorrect password",
      data: null,
    });
  } else {
    responseTemplate({
      res,
      statusCode: 200,
      message: "User signed in successfully",
      data: { token: await generateJWT(user) },
    });
  }
};
