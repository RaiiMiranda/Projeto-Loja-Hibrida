// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: productRoutes.js
// -- Define as rotas
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { Router } from "express";
import { productController } from "../controllers/productController.js";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = Router();

// CREATE
router.post("/", auth, isAdmin, productController.create);

// READ ALL
router.get("/", productController.findAll);

// READ ONE (id)
router.get("/:id", productController.findById);

// UPDATE
// router.put("/:id", productController.update);

// DELETE
router.delete("/:id", auth, isAdmin, productController.deleteById);

export default router;