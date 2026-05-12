// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: productImageController.js
// -- Recebe a requisição e envia resposta
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { productImageService } from "../services/productImageService.js";

export const productImageController = {

    async upload(req, res) {
        try {
            const { id  } = req.params;
            const image = await productImageService.createImage(req.file.filename, id);
            
            res.status(201).json(image);
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    },

    async findByProduct(req, res) {
        try {
            const { id } = req.params;
            const images = await productImageService.getByProduct(id);

            res.json(images);
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    },

    async delete(req, res) {
        try {
            const { imageId } = req.params;
            await productImageService.deleteImage(imageId);

            res.json({ message: "Imagem removida!" });
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    }

};