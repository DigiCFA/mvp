
// const multer = require("multer");
import multer from "multer";


// Creating the storage variable
// Uploads to main directory by default
const storage = multer.memoryStorage({
    destination: function(req, file, cb) {
        cb(null, "")
    }
});

// Only photos
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

export const upload = multer({ storage: storage, fileFilter: fileFilter });

