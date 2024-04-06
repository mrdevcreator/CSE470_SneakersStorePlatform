
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    newPrice: {
      type: Number,
    },
    category: {
      type: String,
      enum:["regular","exclusive"],
      required: true,
    },
    quantity: { 
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
    colors: {
      type: [String],
      required: false,
    },
    sizes: {
      type: [{ size: String, quantity: Number }],
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);