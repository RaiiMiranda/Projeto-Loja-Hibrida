// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: productRoutes.js
// -- Define as rotas
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { Router } from "express";
import { productController } from "../controllers/productController.js";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = Router();

// Usuário comum pode procurar os produtos
router.get("/", productController.findAll);
router.get("/:id", productController.findById);

// Apenas admins podem passar por essas rotas
router.use(auth, isAdmin);

router.post("/", productController.create);
//router.put("/:id", productController.update);
router.delete("/:id", productController.deleteById);

export default router;