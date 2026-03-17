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
router.get("/", cartController.getCart);
router.post("/add", cartController.addItem);
router.delete("/remove", cartController.removeItem);
router.post("/update", cartController.update);
router.post("/checkout", cartController.checkout);

export default router;