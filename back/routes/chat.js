const express = require("express");
const router = express.Router();
const { zchat, zchatcoll, zcoll } = require("../models"); // Assuming you have imported your Sequelize models

// Route to fetch all lines from zchat and include associated IdColl from zchatcoll
router.get("/getAll", async (req, res) => {
  try {
    // Fetch data from zchat along with associated IdColl values from zchatcoll
    const result = await zchat.findAll({
      include: {
        model: zchatcoll,
        attributes: ["IdColl"], // Select only the IdColl field
      },
    });
    res.json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
