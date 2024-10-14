import { Request, Response } from "express";
import prisma from "../db";
import { User } from "../interfaces/IUser";
import { responseTemplate } from "../utils/responser";

export const getUpdates = async (req: Request, res: Response) => {
  try {
    const requestUpdates = await prisma.update.findMany({
      include: {
        product: true,
      },
    });
    responseTemplate({
      res,
      message: "Fetched updates successfully",
      statusCode: 200,
      data: {
        total: requestUpdates.length,
        products: requestUpdates,
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

export const getUpdate = async (req: Request, res: Response) => {
  const updateId: string = req.params.id;
  try {
    const targetUpdate = await prisma.update.findFirst({
      where: {
        id: updateId,
      },
      include: {
        product: true,
      },
    });
    responseTemplate({
      res,
      message: "Fetched update successfully",
      statusCode: 200,
      data: targetUpdate === null ? {} : targetUpdate,
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

export const createUpdate = async (req: Request, res: Response) => {
  const { title, body, version, asset, productId } = req.body;
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

export const updateUpdate = async (req: Request, res: Response) => {
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

export const deleteUpdate = async (req: Request, res: Response) => {
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
