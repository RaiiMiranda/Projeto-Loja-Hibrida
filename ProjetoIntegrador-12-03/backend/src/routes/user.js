import { Router } from "express";
import pool from '../config/database.js';
import bcrypt from 'bcrypt';

const router = Router();

// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- CRUD
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

// CREATE
router.post("/", async(req, res) => {
    // console.log(req.body);
    try {
        const { is_admin, name, email, password, cpf, phone } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            "INSERT INTO users (is_admin, name, email, password, cpf, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [is_admin, name, email, hashedPassword, cpf, phone]);
        res.json(newUser.rows[0]); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error!");
    }
});

// READ ALL
router.get("/", async (req, res) => { 
    try {
        const response = await pool.query("SELECT * FROM users ORDER BY name ASC");
        res.json(response.rows); 
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