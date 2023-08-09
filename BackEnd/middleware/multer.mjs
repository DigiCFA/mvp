
// const multer = require("multer");
import multer from "multer";


// // Creating the storage variable
// // Uploads to main directory by default
// const storage = multer.memoryStorage({
//     destination: function(req, file, cb) {
//         cb(null, "")
//     }
// });

// const filefilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg')
// }


export const upload = multer({ storage });

