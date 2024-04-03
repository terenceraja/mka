var express = require("express");
var router = express.Router();

const fs = require("fs");

//middleware
const filemakerScript = require("../middleware/filemakerScript");

// // ROUTE ON PAGE NEWSADMIN : DELETE NEWS BY ID
router.post("/clientinfo", async function (req, res, next) {
  try {
    console.log("req.body", req.body);
    console.log("FILENAME:", req.body.param);

    // // BINARYYYYY
    // const data = fs.readFileSync(req.body.param, async function (err, data) {
    //   if (err) {
    //     console.error("Error reading file:", err);
    //     return res.status(500).json({ error: "Error reading file" });
    //   }
    //   // // Encode the file contents in Base64
    //   const base64Data = data.toString("base64");
    //   // // console.log(base64Data);
    // });
    // res.send(data);

    // BASE64
    fs.readFile(req.body.param, async function (err, data) {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ error: "Error reading file" });
      }
      // // Encode the file contents in Base64
      const base64Data = data.toString("base64");
      // // console.log(base64Data);
      res.send(base64Data);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
