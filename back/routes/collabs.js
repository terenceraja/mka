var express = require("express");
var router = express.Router();
var path = require("path");
const fs = require("fs");
//JWT
const verifyJwt = require("../middleware/jwt");

const { Sequelize } = require("sequelize");

const { zcoll, zchatcoll } = require("../models"); // Import your Sequelize model

// ROUTE ON PAGE ADMIN COLLABCONFIG : GET ALL COLLABS
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

// ROUTE ON PAGE ADMIN COLLABCONFIG : SAVE A COLLAB
router.post("/add", verifyJwt, async function (req, res, next) {
  try {
    const { IdColl, name, surname, color, password } = req.body;
    console.log(typeof IdColl);

    // Check if a collab with the same IdColl already exists
    const existingCollab = await zcoll.findOne({ where: { IdColl: IdColl } });
    if (existingCollab) {
      return res.json({
        error: true,
        message: "ID Collaborateur déjà utilisé ",
      });
    }

    // Create a new entry in the database with the provided data
    const newCollab = await zcoll.create({
      IdColl: IdColl,
      Name: name,
      Surname: surname,
      Password: password,
      Color: color,
    });

    // Fetch all collabs after adding the new entry (optional, for demonstration purposes)
    const collabs = await zcoll.findAll();

    res.json({
      auth: true,
      message: "Collab added successfully",
      data: collabs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/delete", verifyJwt, async function (req, res, next) {
  try {
    const { IdColl } = req.body;
    await zchatcoll.destroy({ where: { IdColl } });
    await zcoll.destroy({ where: { IdColl } });

    // Fetch all collabs after deleting the entry (optional, for demonstration purposes)
    const collabs = await zcoll.findAll();

    res.json({
      auth: true,
      message: "Collab deleted successfully",
      data: collabs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/check", verifyJwt, async function (req, res, next) {
  try {
    const { IdColl } = req.body;

    // Delete the entry from the database with the provided IdColl
    const collab = await zcoll.findOne({ where: { IdColl } });

    console.log(collab);
    if (!collab) {
      res.json({
        auth: true,
        message: "Collab not found !",
      });
    } else {
      res.json({
        auth: true,
        message: "Collab found !",
        data: collab,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
