var express = require("express");
var router = express.Router();
var path = require("path");
const fs = require("fs");

const { Sequelize } = require("sequelize");

const { znews } = require("../models"); // Import your Sequelize model

//JWT
const verifyJwt = require("../middleware/jwt");

// ROUTE ON PAGE DOC : GET DEMAND DOCS VIA IdCLI IdMANAGER
router.post("/", verifyJwt, async function (req, res, next) {
  try {
    const { IdCtraCli } = req.body;
    console.log(req.body);

    const news = await znews.findAll({
      where: {
        IdCtraCli: IdCtraCli,
      },
      // order: [["CptaDateOPE_lsd", "DESC"]], // ASC for ascending, DESC for descending
    });

    res.json({ auth: true, message: "News found !", data: news }); // Send the result as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
