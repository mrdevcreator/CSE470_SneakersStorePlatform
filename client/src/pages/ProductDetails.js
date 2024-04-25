import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

import star from "../components/assets/star_icon.png";
import star_fade from "../components/assets/star_dull_icon.png";
import SneakerSizeCalculator from "../components/SizeConverter/SneakerSizeCalculator";

import "./ProductDetails.scss";
import CopyToClipboardButton from "../components/COPYCLIPBOARD/CopyToCLipboardButton";
import Breadcrum from "../components/Breadcrumbs/Breadcrum";

const ProductDetails = () => {
  const params = useParams();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [cart, setCart] = useCart();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");


  //initalp details
  useEffect(() => {
    if (params?.pid) getProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.pid]);


  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.pid}`
      );
      setProduct(data?.product);
    } catch (error) {
      //console.log("Error fetching product", error);
    }
  };

  const addToCart = () => {
    const productWithColor = {
      ...product,
      selectedColor: selectedColor,
      selectedSize: selectedSize,
    };

    if (selectedColor === "" || selectedColor === undefined || selectedColor === null || selectedColor === " ") {
      alert("Please select a color to proceed.");
    } else if(selectedSize === "" || selectedSize === " ") {
      alert("Please select a size to proceed.");
    }
    else {
      setCart((prevCart) => {
        const updatedCart = [...prevCart, productWithColor];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        alert("Product added to cart");
        return updatedCart;
      });
    }
  };

  return (
    <Layout>
      <Breadcrum category={product.category} productName={product.name} />
      <div className="product-display">
        <div className="product-display-left">
          <div className="product-display-image">
            <img
              className="product-display-main-image"
              src={`/api/v1/product/photo-product/${product._id}`}
              alt={product.name}
            />
          </div>
        </div>

        <div className="product-display-right">
          <h1>{product.name}</h1>

          <div className="product-display-star">
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star_fade} alt="" />
            <p>(200)</p>
          </div>

          <div className="product-display-right-price">
            <div className="new-price">${product.newPrice}</div>
            <div className="old-price">${product.price}</div>
          </div>
          <div className="product-display-desc">
            <p className="description">{product.description}</p>
          </div>
          <div className="product-display-color">
            <p>Color:</p>
            {product.colors && product.colors.length !== 0 ? (
              product.colors[0]
                .split(",")
                .map((color, index) => (
                  <div
                    key={index}
                    className={`${color} ${
                      selectedColor === color ? "selected" : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                  ></div>
                ))
            ) : (
              <div className="nocolor">No color available</div>
            )}
          </div>
          <div className="product-display-size">
            <p>Size:</p>
            {product.sizes && product.sizes.map((size, index) => (
              <div onClick={()=> {
                setSelectedSize(size.size);
              }} key={index} className={`size ${ size.quantity === 0 ? "out" : ""} ${size.quantity !== 0 &&selectedSize === size.size ? "selected" : ""}`}>
                {size.size}
              </div>
            ))}
          </div>

          <button className="btn" onClick={addToCart}>
            ADD TO CART
          </button>
        </div>
        <CopyToClipboardButton />
      </div>
      <SneakerSizeCalculator />
    </Layout>
  );
};

export default ProductDetails;
