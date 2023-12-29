// const multer = require("multer");
import multer from "multer";

// Creating the storage variable

// Memory Storage
// Uploads to main directory by default
const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});


// Disk Storage
// Not necessary as profile pictures are generally a few MBs. Also look into muilter-s3
const storageDisk = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
  filename: function (req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

// To only accept .jpg, .jpeg and .png files
const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    console.log("VALID FILE FORMAT");
    callback(null, true);
  } else {
    console.log("INVALID FILE FORMAT");
    callback(new Error("Unsupported file type"), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});
