// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: cartRoutes.js
// -- Define as rotas
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { Router } from "express";
import { cartController } from "../controllers/cartController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// Protegendo todas as rotas para saber quem é o usuário logado
router.use(auth);

// rotas do carrinho
router.post("/", cartController.add);
router.get("/", cartController.getCart);
router.delete("/:id", cartController.remove);

export default router;