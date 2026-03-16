// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: productRoutes.js
// -- Define as rotas
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { Router } from "express";
import { productController } from "../controllers/productController.js";

const router = Router();

// CREATE
router.post("/", productController.create);

// READ ALL
router.get("/", productController.findAll);

// READ ONE (id)
router.get("/:id", productController.findById);

// UPDATE
// router.put("/:id", productController.update);

// DELETE
// router.delete("/:id", productController.remove);

export default router;