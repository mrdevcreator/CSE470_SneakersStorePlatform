import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select, InputNumber } from "antd";
import "./CreateProduct.scss";

const { Option } = Select;

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [colors,setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("newPrice", newPrice);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("colors", colors);
      productData.append("sizes", JSON.stringify(sizes));
      const { data } =await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        navigate("/dashboard/admin/show-products");
      } else {
        alert("Failed to create product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddSize = () => {
    setSizes([...sizes, { size: "", quantity: 0 }]);
  };

  const handleSizeChange = (index, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index] = { ...updatedSizes[index], size: value };
    setSizes(updatedSizes);
  };

  const handleQuantityChange = (index, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index] = { ...updatedSizes[index], quantity: Number(value) };
    setSizes(updatedSizes);
  };

  return (
    <Layout>
      <div className="create-product">
        <div className="dash-card">
          <AdminMenu />

          <div className="right">
            <h1>Create Product</h1>
            <div className="right-main-body">
              <div className="right-1">
                <Select
                  placeholder="Select Category"
                  showSearch
                  className="select"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  <Option value="regular">Regular</Option>
                  <Option value="exclusive">Exclusive</Option>
                </Select>

                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "upload photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                    hidden
                  />
                </label>

                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"150px"}
                      className="img img-responsive"
                    />
                  </div>
                )}

                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Write a name"
                  className="form-control"
                />

                <textarea
                  type="text"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  placeholder="Write description"
                  className="form-control"
                />
              </div>

              <div className="right-2">
                {sizes.map((size, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      placeholder="Size"
                      value={size.size}
                      onChange={(e) => handleSizeChange(index, e.target.value)}
                      className="size-input"
                    />
                    <InputNumber
                      min={0}
                      placeholder="Quantity"
                      value={size.quantity}
                      onChange={(value) => handleQuantityChange(index, value)}
                      className="quantity-input"
                    />
                  </div>
                ))}
                <button className="btn btn-primary" onClick={handleAddSize}>
                  Add Size
                </button>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  placeholder="Write old price"
                  className="size-input"
                />

                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => {
                    setNewPrice(e.target.value);
                  }}
                  placeholder="Write new price"
                  className="size-input"
                />

                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                  placeholder="Write quantity"
                  className="size-input"
                />

                <Select
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="select"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>

                <Select
                  placeholder="Select Colours"
                  mode="multiple"
                  size="large"
                  showSearch
                  className="select"
                  onChange={(value) => {
                    setColors(value);
                  }}
                >
                  <Option value="red">Red</Option>
                  <Option value="brown">Brown</Option>
                  <Option value="black">Black</Option>
                  <Option value="white">White</Option>
                  <Option value="blue">Blue</Option>
                </Select>

                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
