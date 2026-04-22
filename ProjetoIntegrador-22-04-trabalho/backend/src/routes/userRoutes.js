// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: userRoutes.js
// -- Define as rotas
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = Router();

// Create
router.post("/", userController.create);

// Apenas administradores podem acessar as rotas abaixo
router.use(auth, isAdmin);

// Rotas do admin
router.get("/", userController.findAll);
router.get("/email/:email", userController.findByEmail);
router.get("/id/:id", userController.findById);
router.put("/:id", userController.updateActive);

export default router;