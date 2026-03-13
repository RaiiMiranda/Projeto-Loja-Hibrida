import { Router } from "express";
import pool from '../config/database.js';

const router = Router();

// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- CRUD
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

// CREATE - Criando um novo produto
router.post("/", async(req, res) => {
    try {
        const { name, brand, condition, description, price, available, category_id } = req.body;
        const newProduct = await pool.query(
            "INSERT INTO product (name, brand, condition, description, price, available, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [name, brand, condition, description, price, available, category_id]);
        res.json(newProduct.rows[0]); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error!");
    }
});

// READ ALL
router.get("/", async (req, res) => { 
    try {
        const response = await pool.query("SELECT * FROM product");
        res.json(response.rows); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error!");
    }
});

export default router;