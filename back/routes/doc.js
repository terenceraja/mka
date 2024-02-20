var express = require("express");
var router = express.Router();
var path = require("path");
const fs = require("fs");
//JWT
const verifyJwt = require("../middleware/jwt");

const { Sequelize } = require("sequelize");

const { zfile } = require("../models"); // Import your Sequelize model

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, files, cb) => {
    cb(null, "store");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Define a file filter function to accept only PDF files
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only PDF, JPEG, and PNG files are allowed"), false); // Reject the file
  }
};

// Set the file size limit to 5MB
const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB in bytes
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

// UPLOAD FILE
router.post(
  "/upload",
  verifyJwt,
  upload.single("file"),
  async function (req, res, next) {
    try {
      console.log(req.file);
      const FileId = req.body.FileId;
      console.log(FileId);
      const { filename, path } = req.file;

      // Update the record in the database
      const updateResult = await zfile.update(
        {
          FileName: filename,
          FilePath: path,
          TimeStampUpload: Sequelize.literal("CURRENT_TIMESTAMP"),
          TimeStampModification: Sequelize.literal("CURRENT_TIMESTAMP"),
          Status: "pending",
        },
        { where: { IdFile: FileId } }
      );

      console.log("RESPONSE", updateResult);

      res.json({
        auth: true,
        message: "File stored in backend !",
        data: updateResult,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ROUTE ON PAGE DOC : GET DEMAND DOCS VIA IdCLI IdMANAGER
router.post("/onDemand", verifyJwt, async function (req, res, next) {
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

    res.json({ auth: true, message: "Doc demands found !", data: docDemand }); // Send the result as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ROUTE ON PAGE DOC : GET ALL SENT DOCS VIA IdCLI
router.post("/sent", verifyJwt, async function (req, res, next) {
  try {
    const { IdCtraCli } = req.body;
    console.log(req.body);

    const docDemand = await zfile.findAll({
      where: {
        IdCtraCli: IdCtraCli,
        Status: {
          [Sequelize.Op.not]: "demand", // Using Sequelize's not operator
        },
      },
      // order: [["CptaDateOPE_lsd", "DESC"]], // ASC for ascending, DESC for descending
    });

    res.json({ auth: true, message: "Doc demands found !", data: docDemand }); // Send the result as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
