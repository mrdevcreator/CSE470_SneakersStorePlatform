import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  exclusiveProductController,
  filterProductController,
  getProductController,
  getSingleProductController,
  photoProductController,
  regularProductController,
  searchProductController,
  updateProductController,
  updateProductSizeQuantityController,
} from "../controllers/productController.js";

import formidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);


router.get("/get-product", getProductController);
router.get("/get-product/:pid", getSingleProductController);
router.get("/photo-product/:pid", photoProductController);
router.delete("/delete-product/:pid", deleteProductController);
router.post("/filter-product", filterProductController);
// router.get("/count-product",countProductController);
// router.get("/list-product/:page",listProductController);
router.get("/search/:keyword", searchProductController);
router.get("/regular-products", regularProductController);
router.get("/exclusive-products", exclusiveProductController);


router.put(
  "/update-product-sizeQuantity/:pid",
  updateProductSizeQuantityController
);

router.get("/braintree/token", braintreeTokenController);
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
