// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: productImageSerive.js
// -- Regras do Sistema
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import { productImageModel } from "../models/productImageModel.js";

export const productImageService = {

    async createImage(filename, product_id) {
        const url = `/uploads/${filename}`;

        return await productImageModel.create(url, product_id);
    },

    async getByProduct(product_id) {
        return await productImageModel.findByProduct(product_id);
    },

    async deleteImage(id) {
        return await productImageModel.deleteById(id);
    }

};