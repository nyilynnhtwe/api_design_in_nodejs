import prisma from "../../src/db";
import { faker } from "@faker-js/faker";

export const productSeeder = async (userId: string) => {
  for (let index = 0; index < 200; index++) {
    await prisma.product.create({
      data: {
        name: faker.commerce.product(),
        userId,
      },
    });
  }
};
