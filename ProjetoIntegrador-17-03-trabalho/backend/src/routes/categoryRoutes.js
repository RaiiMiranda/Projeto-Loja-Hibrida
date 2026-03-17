// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: categoryRoutes.js
// -- Define as rotas
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { Router } from "express";
import { categoryController } from "../controllers/categoryController.js";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = Router();

// CREATE
router.post("/", auth, isAdmin, categoryController.create);

// READ ALL
router.get("/", categoryController.findAll);

// READ ONE (id)
router.get("/:id", categoryController.findById);

// UPDATE
// router.put("/:id", productController.update);

// DELETE
// router.delete("/:id", productController.remove);

export default router;