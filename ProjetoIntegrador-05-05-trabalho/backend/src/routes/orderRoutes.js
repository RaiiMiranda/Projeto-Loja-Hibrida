// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: orderRoutes.js
// -- Define as rotas
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { Router } from "express";
import { orderController } from "../controllers/orderController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// Apenas usuários logados podem acessar as rotas abaixo
router.use(auth);

router.post("/", orderController.create);
router.get("/:id", orderController.getById);

export default router;