var express = require("express");
var router = express.Router();
var path = require("path");
const fs = require("fs");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, files, cb) => {
    cb(null, "store");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// UPLOAD FILE
router.post("/", upload.array("files"), async function (req, res, next) {
  try {
    // 1. Store file information in the database
    // const { filename, path: filePath } = req.file;
    //   const uploadedFile = await UploadedFile.create({ filename, filePath });
    // // 2. Delete the uploaded file from storage
    // try {
    //   fs.unlinkSync(filePath);
    //   // File deleted successfully
    //   res.json({
    //     message: "File stored and deleted from storage!",
    //   });
    // } catch (err) {
    //   console.error("Error deleting file:", err);
    //   // Handle error while deleting file
    //   res.status(500).json({ error: "Error deleting file from storage" });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
