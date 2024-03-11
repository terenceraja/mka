var express = require("express");
var router = express.Router();
var path = require("path");
const fs = require("fs");
//JWT
const verifyJwt = require("../middleware/jwt");

const { Sequelize } = require("sequelize");

const { zcoll } = require("../models"); // Import your Sequelize model

// ROUTE ON PAGE DOC : GET DEMAND DOCS VIA IdCLI IdMANAGER
router.get("/", verifyJwt, async function (req, res, next) {
  try {
    const collabs = await zcoll.findAll({
      // order: [["CptaDateOPE_lsd", "DESC"]], // ASC for ascending, DESC for descending
    });

    res.json({ auth: true, message: "Collabs found !", data: collabs }); // Send the result as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
