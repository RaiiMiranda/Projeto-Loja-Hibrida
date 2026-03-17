// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: userRoutes.js
// -- Define as rotas
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { Router } from "express";
import { userController } from "../controllers/userController.js";

const router = Router();

// CREATE
router.post("/", userController.create);

// READ ALL
router.get("/", userController.findAll); // !!!!!!!!!!!!!!!!!!!!!!!!   só o admin deveria fazer isso?

// READ ONE (id)
// router.get("/:id", userController.findById);

// READ ONE (email)
router.get("/:email", userController.findByEmail);

// UPDATE
// router.put("/:id", userController.update);

// DELETE
// router.delete("/:id", userController.remove);

export default router;