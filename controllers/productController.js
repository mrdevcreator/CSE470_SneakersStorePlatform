import productModel from "../models/productModel.js";
import fs from "fs";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";

dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    let {
      name,
      description,
      price,
      category,
      quantity,
      sizes,
      shipping,
      colors,
    } = req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 5000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 5mb" });
    }
    try {
      sizes = JSON.parse(sizes); // Parse sizes back into an array
    } catch (error) {
      return res.status(400).send({ error: "Invalid sizes format" });
    }
    const products = new productModel({
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      colors,
      sizes,
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: error.message,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .limit(15)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      Total_products: products.length,
      message: "All Products",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error at getting products",
      error: error.message,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.pid)
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "Getting a product",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting a product",
      error,
    });
  }
};

export const photoProductController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    return res.status(200).send({
      success: true,
      message: "Product Deleted",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating product",
    });
  }
};

export const updateProductSizeQuantityController = async (req, res) => {
  try {
    const { selectedSize } = req.body;
    const { pid } = req.params;
    console.log(selectedSize);
    console.log(pid);

    const product = await productModel.findById(pid);
    if (!product) {
      return res.status(404).send({ error: "Product not found jj" });
    }

    const sizeIndex = product.sizes.findIndex(
      (size) => size.size === selectedSize
    );
    if (sizeIndex === -1) {
      return res.status(400).send({ error: "Size not found in product" });
    }

    product.sizes[sizeIndex].quantity -= 1;
    if (product.sizes[sizeIndex].quantity < 0) {
      return res.status(400).send({ error: "Product size is out of stock" });
    }

    await product.save();

    res.status(200).send({
      success: true,
      message: "Product size quantity updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: error.message,
    });
  }
};

export const filterProductController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error while filtering products",
      error,
    });
  }
};


export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in searching",
      error,
    });
  }
};

export const regularProductController = async (req, res) => {
  try {
    const regularProducts = await productModel.find({ category: "regular" });
    res.json({ success: true, products: regularProducts }); // Corrected response structure
  } catch (error) {
    console.error("Error fetching regular products:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const exclusiveProductController = async (req, res) => {
  try {
    const exclusiveProducts = await productModel.find({
      category: "exclusive",
    });
    res.json({ success: true, products: exclusiveProducts });
  } catch (error) {
    console.error("Error fetching exclusive products:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {}
};

export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            selectedColor: cart[0].selectedColor,
            selectedSize: cart[0].selectedSize,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {}
};
