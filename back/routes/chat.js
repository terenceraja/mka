const express = require("express");
const router = express.Router();
const { zchat, zchatcoll, zcoll } = require("../models");

// Route to fetch all lines from zchat and include associated IdColl from zchatcoll along with details from zcoll
router.get("/getAll", async (req, res) => {
  try {
    const result = await zchat.findAll({
      include: [
        {
          model: zchatcoll,
          attributes: ["IdColl"], // Select only the IdColl field from zchatcoll
          include: [
            {
              model: zcoll, // Include the zcoll model
              attributes: ["Name", "Surname", "Color"], // Select specific attributes from zcoll
            },
          ],
        },
      ],
    });
    res.json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to add a new line to zchatcoll with IdChat and IdColl
router.post("/addCollab", async (req, res) => {
  try {
    // Extract IdChat and IdColl from the request body
    const { IdChat, IdColl } = req.body;

    // Create a new entry in zchatcoll table with the provided IdChat and IdColl
    const result = await zchatcoll.create({
      IdChat: IdChat,
      IdColl: IdColl,
    });

    const addedCollab = await zcoll.findOne({
      where: {
        IdColl: result.IdColl,
      },
      attributes: ["IdColl", "Name", "Surname", "Color"], // Select only the IdColl field from zchatcoll
    });

    // Send the created entry as the response
    res.json({
      auth: true,
      message: `Collab added in group chat ${IdChat}`,
      addedCollab: addedCollab,
    });
  } catch (error) {
    console.error("Error adding collaborator:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to delete a line from zchatcoll with IdChat and IdColl
router.post("/deleteCollab", async (req, res) => {
  try {
    // Extract IdChat and IdColl from the request body
    const { IdChat, IdColl } = req.body;

    // Delete the entry from zchatcoll table with the provided IdChat and IdColl
    await zchatcoll.destroy({
      where: {
        IdChat: IdChat,
        IdColl: IdColl,
      },
    });

    // Fetch the updated list of zchatcoll based on IdChat
    const updatedList = await zchatcoll.findAll({
      where: {
        IdChat: IdChat,
      },
      attributes: ["IdColl"], // Select only the IdColl field from zchatcoll
      include: [
        {
          model: zcoll, // Include the zcoll model
          attributes: ["Name", "Surname", "Color"], // Select specific attributes from zcoll
        },
      ],
    });

    // Send the response with the updated list
    res.json({
      auth: true,
      message: `Collab ${IdColl} removed from group chat ${IdChat}`,
      data: updatedList,
    });
  } catch (error) {
    console.error("Error removing collaborator:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
