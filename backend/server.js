const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());

const products = require("./data/products.json");
const categories = require("./data/categories.json");

// GET all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// GET product by ID
app.get("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(product);
});

// GET categories
app.get("/api/categories", (req, res) => {
  res.json(categories);
});

app.listen(PORT, () => {
  console.log("API http://localhost:" + PORT);
});
