import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { validateInputs } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
const router = Router();

// Routes for Product
router.get("/product", getProducts);
router.get("/product/:id", getProduct);
router.put(
  "/product/:id",
  body("name").notEmpty(),
  validateInputs,
  updateProduct
);
router.post("/product", body("name").notEmpty(), validateInputs, createProduct);
router.delete("/product/:id", deleteProduct);

// Routes for Update
router.get("/update", );
router.get("/update/:id", () => {});
router.put(
  "/update/:id",
  body("title").optional().isString(),
  body("body").optional().isString(),
  body("version").optional().isString(),
  body("asset").optional().isString(),
  body("productId").optional().isString(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  () => {}
);
router.post(
  "/update",
  body("title").isString(),
  body("body").isString(),
  body("version").optional().isString(),
  body("asset").optional().isString(),
  body("productId").isString(),
  () => {}
);
router.delete("/update/:id", () => {});

// Routes for Update Point
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  body("updateId").optional().isString(),
  () => {}
);
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").isString(),
  () => {}
);
router.delete("/updatepoint/:id", () => {});

export default router;
