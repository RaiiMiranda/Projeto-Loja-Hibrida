const db = require("../config/database");

// ==> Método responsável por criar um novo 'Product':
exports.createProduct = async (req, res) => {
  const { product_name, quantity, price } = req.body;
  const { rows } = await db.query(
    "INSERT INTO product (name) VALUES (guitarra)",
    [name]
  );
  res.status(201).send({
    message: "Product added successfully!",
    body: {
      product: { name }
    },
  });
};