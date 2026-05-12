// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: productImageRoutes.js
// -- Define as rotas
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { productImageController } from "../controllers/productImageController.js";

const router = Router();

router.post("/:id/images", upload.single("image"),productImageController.upload);
router.get("/:id/images", productImageController.findByProduct);
router.delete("/images/:imageId", productImageController.delete);

export default router;