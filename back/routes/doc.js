var express = require("express");
var router = express.Router();
var path = require("path");
const fs = require("fs");
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

const upload = multer({ storage: storage });

// UPLOAD FILE
router.post("/upload", upload.single("file"), async function (req, res, next) {
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
      message: "File stored in backend !",
      data: updateResult,
    });
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

// ROUTE ON PAGE DOC : GET ALL SENT DOCS VIA IdCLI
router.post("/sent", async function (req, res, next) {
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

    res.json({ message: "Doc demands found !", data: docDemand }); // Send the result as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
