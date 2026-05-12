// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Arquivo: upload.js
// -- Middleware para upload de imagens
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "public/uploads/");
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() + path.extname(file.originalname);

        cb(null, uniqueName);
    }

});

export const upload = multer({
    storage
});