// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: categoryRoutes.js
// -- Define as rotas
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { Router } from "express";
import { categoryController } from "../controllers/categoryController.js";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = Router();

// Usuários comuns podem procurar por categorias
router.get("/", categoryController.findAll);
router.get("/:id", categoryController.findById);

// Apenas administradores podem acessar as rotas abaixo
router.use(auth , isAdmin);

router.post("/", categoryController.create);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.deleteById);

export default router;