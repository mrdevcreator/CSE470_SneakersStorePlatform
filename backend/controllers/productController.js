const Product = require("../models/productModels.js");


//create - Admin
exports.createProduct = async(req,res,next)=>{
    const newProduct = await Product.create(req.body)

    res.status(201).json({
        success:true,
        newProduct
    })
}

//get all products
exports.getAllProducts = async(req, res) => {

    const products = await Product.find()
  res.status(200).json({
    success:true,
    products
  });
};

//get single product
exports.getProduct=async(req,res,next)=>{
    const getProduct = await Product.findById(req.params.id)

    if(!getProduct){
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }
    res.status(200).json({
        success:true,
        getProduct
    })
}

//update product - Admin

exports.updateProducts = async(req,res,next)=>{

    let product = await Product.findById(req.params.id)

    if(!product){
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json({
        success:true,
        product
    })
}

//delete product - Admin
exports.deleteProduct=async(req,res,next)=>{
    const prevProduct = await Product.findById(req.params.id)

    if(!prevProduct){
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }
    await prevProduct.deleteOne()

    res.status(200).json({
        success:true,
        message:"Product has been deleted"
    })
}