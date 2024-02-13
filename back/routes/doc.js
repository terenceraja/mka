var express = require("express");
var router = express.Router();
var path = require("path");
const fs = require("fs");

const { zfile } = require("../models"); // Import your Sequelize model

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, files, cb) => {
    // console.log(req);
    cb(null, "store");
  },
  filename: (req, file, cb) => {
    // console.log(req);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// UPLOAD FILE
router.post("/upload", upload.array("files"), async function (req, res, next) {
  try {
    console.log(req.file);
    // 1. Store file information in the database
    // const { filename, path: filePath } = req.file;
    //   const uploadedFile = await UploadedFile.create({ filename, filePath });
    // // 2. Delete the uploaded file from storage
    // try {
    //   fs.unlinkSync(filePath);
    //   // File deleted successfully
    res.json({
      message: "File stored in backend !",
    });
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

// GET ONDEMAND FILES
router.post("/upload", upload.array("files"), async function (req, res, next) {
  try {
    console.log(req.file);
    // 1. Store file information in the database
    // const { filename, path: filePath } = req.file;
    //   const uploadedFile = await UploadedFile.create({ filename, filePath });
    // // 2. Delete the uploaded file from storage
    // try {
    //   fs.unlinkSync(filePath);
    //   // File deleted successfully
    res.json({
      message: "File stored in backend !",
    });
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

// ROUTE ON PAGE DOC : GET DEMAND DOCS VIA IdCLI IdMANAGER
router.post("/onDemand", async function (req, res, next) {
  try {
    const { IdCtraCli } = req.body;
    console.log(req.body);

    const docDemand = await zfile.findAll({
      where: {
        IdCtraCli: IdCtraCli,
        Status: "demand",
      },
      // order: [["CptaDateOPE_lsd", "DESC"]], // ASC for ascending, DESC for descending
    });

    res.json({ message: "Doc demands found !", data: docDemand }); // Send the result as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
