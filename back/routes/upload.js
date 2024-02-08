var express = require("express");
var router = express.Router();
var path = require("path");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, files, cb) => {
    cb(null, "store");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// UPLOAD FILE
router.post("/", upload.single("file"), async function (req, res, next) {
  try {
    res.json({ message: "File stored !", data: req.file });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
