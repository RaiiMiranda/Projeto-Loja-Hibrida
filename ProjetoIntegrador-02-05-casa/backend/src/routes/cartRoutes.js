// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: cartRoutes.js
// -- Define as rotas
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { Router } from "express";
import { cartController } from "../controllers/cartController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// Protegendo todas as rotas para saber quem é o usuário logado antes de prosseguir para o controller
router.use(auth);

// Rotas do carrinho
router.get("/", cartController.getUserCart);
router.post("/", cartController.addItem);
router.put("/:id", cartController.updateQuantity);
router.delete("/:id", cartController.removeItem);
router.delete("/", cartController.clear);
router.post("/checkout", cartController.checkout);

export default router;