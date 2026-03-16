// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: categoryRoutes.js
// -- Define as rotas
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { Router } from "express";
import { categoryController } from "../controllers/categoryController.js";

const router = Router();

// CREATE
router.post("/", categoryController.create);

// READ ALL
router.get("/", categoryController.findAll);

// READ ONE (id)
router.get("/:id", categoryController.findById);

// UPDATE
// router.put("/:id", productController.update);

// DELETE
// router.delete("/:id", productController.remove);

export default router;