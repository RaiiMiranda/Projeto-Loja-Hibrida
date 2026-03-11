import { Router } from "express";
import pool from '../config/database.js';

const router = Router();

// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- CRUD
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

// CREATE
router.post("/", async(req, res) => {
    console.log(req.body);
    try {
        const { name } = req.body;

        const newCategory = await pool.query(
        "INSERT INTO category (name) VALUES ($1) RETURNING *",
        [name]);
        res.json(newCategory.rows[0]); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error!");
    }
});

// READ ALL
router.get("/", async (req, res) => { 
    try {
        const response = await pool.query("SELECT * FROM category ORDER BY name ASC");
        res.json(response.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error!");
    }
});

// READ ONE
//router.get("/:id", async (req, res) => { /* buscar produto por id */ });

// UPDATE
//router.put("/:id", async (req, res) => { /* atualizar produto */ });

// DELETE
//router.delete("/:id", async (req, res) => { /* deletar produto */ });

export default router;