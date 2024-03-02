const express = require("express");
const { getAllProducts, createProduct, updateProducts, deleteProduct, getProduct } = require("../controllers/productController.js");

const router = express.Router();

router.route("/product").get(getAllProducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").put(updateProducts).delete(deleteProduct).get(getProduct);



module.exports = router;
