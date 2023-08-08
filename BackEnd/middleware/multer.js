
// const multer = require("multer");
import multer from "multer";
const storage = multer.memoryStorage();


export const upload = multer({ storage });

