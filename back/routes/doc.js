var express = require("express");
var router = express.Router();
var path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");

//JWT
const verifyJwt = require("../middleware/jwt");

const { Sequelize } = require("sequelize");

const { zfile } = require("../models"); // Import your Sequelize model

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, files, cb) => {
    cb(null, "storeFile");
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
  fileSize: 10 * 1024 * 1024, // 10MB in bytes
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
      // WARNING///////////////////////////////////////////////////
      // Set NODE_TLS_REJECT_UNAUTHORIZED environment variable to 0
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

      console.log(req.file);
      const IdCtraCli = req.body.IdCtraCli;
      const FileId = req.body.FileId;

      const { filename, path, originalname } = req.file;

      // Read the file asynchronously
      fs.readFile(req.file.path, async function (err, data) {
        if (err) {
          console.error("Error reading file:", err);
          return res.status(500).json({ error: "Error reading file" });
        }
        // Encode the file contents in Base64
        const base64Data = data.toString("base64");
        // console.log(base64Data);

        // TOKEN SESSION
        const myHeadersToken = new Headers();
        myHeadersToken.append("Content-Type", "application/json");
        myHeadersToken.append("Authorization", "Basic MEFkbWluOjAwMDA=");

        const requestOptionsToken = {
          method: "POST",
          headers: myHeadersToken,
          redirect: "follow",
        };

        try {
          const response = await fetch(
            "https://TR-LAPTOP/fmi/data/v1/databases/sandbox2/sessions",
            requestOptionsToken
          );
          const jsonResponse = await response.json();
          const token = jsonResponse.response.token;

          console.log(token);

          // / RUN FM SCRIPT
          const myHeadersFM = new Headers();
          myHeadersFM.append("Content-Type", "application/json");
          myHeadersFM.append("Authorization", `Bearer ${token}`);

          const requestOptionsFM = {
            method: "GET",
            headers: myHeadersFM,
            redirect: "follow",
          };

          try {
            const response = await fetch(
              `https://TR-LAPTOP/fmi/data/v1/databases/sandbox2/layouts/cli/script/Proxy?script.param=${path}%7C${filename}%7C${IdCtraCli}`,
              requestOptionsFM
            );
            const result = await response.json();
            console.log(result);
          } catch (error) {
            console.error(error);
          }
          //
        } catch (error) {
          console.error(error);
        }
        ////
      });

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

      // console.log("RESPONSE", updateResult);

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

    res.json({ auth: true, message: "Doc sent found !", data: docDemand }); // Send the result as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
