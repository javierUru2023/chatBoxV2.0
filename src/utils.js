import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;


// Configuracion de multer para manejo de archivos

const storage = multer.diskStorage({

    // Destino de los archivos subidos

    destination: function (req, file, cb) {

        cb(null, `${__dirname}/public/img`);

    },

    // Renombre del archivo

    filename: function (req, file, cb) {

        cb(null, `${Date.now()}-${file.originalname}`);

    }

});

export const uploader = multer({ storage,

    // Si se genera erro lo mostramos

    onError: function (err, next) {

        console.log('Error al subir el archivo:', err);

        next(err);

    }

 });
