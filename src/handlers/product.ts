import { Request, Response } from "express";
import prisma from "../db";
import { User } from "../interfaces/IUser";
import { responseTemplate } from "../utils/responser";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const requestedUser = await prisma.user.findFirst({
      where: { id: req["user"].id },
      include: {
        products: true,
      },
    });
    responseTemplate({
      res,
      message: "Fetched products successfully",
      statusCode: 200,
      data: {
        total: requestedUser.products.length,
        products: requestedUser.products,
      },
    });
  } catch (error) {
    console.error(error);
    return responseTemplate({
      res,
      data: error,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const productId: string = req.params.id;
  const user: User = req["user"];
  try {
    const targetProduct = await prisma.product.findFirst({
      where: { userId: user.id, id: productId },
    });
    responseTemplate({
      res,
      message: "Fetched products successfully",
      statusCode: 200,
      data: targetProduct === null ? {} : targetProduct,
    });
  } catch (error) {
    console.error(error);
    return responseTemplate({
      res,
      data: error,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name } = req.body;
  const user: User = req["user"];
  try {
    const createdProduct = await prisma.product.create({
      data: {
        name,
        userId: user.id,
      },
    });
    responseTemplate({
      res,
      message: "Product created successfully",
      statusCode: 200,
      data: createdProduct,
    });
  } catch (error) {
    console.error(error);
    return responseTemplate({
      res,
      data: error,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  const name = req.body.name;
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    responseTemplate({
      res,
      message: "Product updated successfully",
      statusCode: 200,
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return responseTemplate({
      res,
      data: error,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userId = req["user"].id;
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id,
        userId,
      },
    });
    responseTemplate({
      res,
      message: "Product deleted successfully",
      statusCode: 200,
      data: deletedProduct,
    });
  } catch (error) {
    console.error(error);
    return responseTemplate({
      res,
      data: error,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};
