const mongoose = require("mongoose");
const Product = require("./model/product");

const url =
  "mongodb+srv://<username>:<password>@cluster0.flezoas.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  const result = await createdProduct.save();

  res.status(201).json({
    message: "Product created successfully",
    product: result,
  });
};

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();

  res.status(200).json({
    message: "Products fetched successfully",
    products: products,
  });
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
