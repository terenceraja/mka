var express = require("express");
var router = express.Router();
var path = require("path");
const fs = require("fs");

const { Sequelize } = require("sequelize");

const { znews } = require("../models"); // Import your Sequelize model

//JWT
const verifyJwt = require("../middleware/jwt");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, files, cb) => {
    cb(null, "../../storeNews");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Define a file filter function to accept only PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only PDF files are allowed"), false); // Reject the file
  }
};

// Set the file size limit to 5MB
const limits = {
  fileSize: 10 * 1024 * 1024, // 10MB in bytes
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

// CREATE/UPLOAD NEWS
router.post(
  "/upload",
  verifyJwt,
  upload.single("file"),
  async function (req, res, next) {
    try {
      console.log(req.file);
      const { Title, Subtitle } = req.body;
      const { filename, path, originalname } = req.file;

      // Update the record in the database
      const response = await znews.create({
        FileName: filename,
        FileOriginalName: originalname,
        FilePath: path,
        Title: Title,
        Subtitle: Subtitle,
      });

      const news = await znews.findAll({
        order: [["TimeStampCreation", "DESC"]], // ASC for ascending, DESC for descending
      });

      console.log("RESPONSE", response);

      res.json({
        auth: true,
        message: "News stored in backend !",
        data: response,
        dataList: news,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ROUTE ON PAGE NEWS : GET ALL NEWS
router.get("/", verifyJwt, async function (req, res, next) {
  try {
    const news = await znews.findAll({
      order: [["TimeStampCreation", "DESC"]], // ASC for ascending, DESC for descending
    });

    res.json({ auth: true, message: "News found !", data: news }); // Send the result as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ROUTE ON PAGE NEWSADMIN : DELETE NEWS BY ID
router.post("/delete", verifyJwt, async function (req, res, next) {
  try {
    const { IdNews } = req.body;

    // Delete the entry from the database with the provided IdNews
    await znews.destroy({ where: { IdNews } });

    // Fetch all collabs after deleting the entry (optional, for demonstration purposes)
    const news = await znews.findAll();

    res.json({
      auth: true,
      message: "News deleted successfully",
      data: news,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
