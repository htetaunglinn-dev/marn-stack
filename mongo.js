const MongoClient = require("mongodb").MongoClient;

//from mongodb, driver connection string
const url =
  "mongodb+srv://<username>:<password>@cluster0.flezoas.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
    // description: req.body.description,
    // image: req.body.image,
  };

  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection("products").insertOne(newProduct);
  } catch {
    return res.status(500).json({
      message: "Error creating product",
    });
  }

  client.close();

  res.status(201).json({
    message: "Product created successfully",
    product: newProduct,
  });
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    const products = await db.collection("products").find().toArray();
    res.status(200).json({
      message: "Products fetched successfully",
      products: products,
    });
  } catch {
    return res.status(500).json({
      message: "Error fetching products",
    });
  }

  client.close();
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
