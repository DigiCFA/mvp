
// const multer = require("multer");
import multer from "multer";


// Creating the storage variable
// Uploads to main directory by default
const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, "")
    }
});

const storage2 = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "");
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    },
});


// Only photos
const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        callback(null, true)
    } else {
        callback(null, false)
    }
}

export const upload = multer({ storage: storage2, fileFilter: fileFilter });

