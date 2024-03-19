const express = require("express");
const router = express.Router();
const { zchat, zchatcoll, zcoll, zchatmsg } = require("../models");

// Route to fetch all lines from zchat and include associated IdColl from zchatcoll along with details from zcoll
router.get("/getAllChat", async (req, res) => {
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
    res.json({ auth: true, message: "All chats found !", data: result });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to fetch all lines from zchat and include associated IdColl from zchatcoll along with details from zcoll
router.get("/getAll/:IdColl", async (req, res) => {
  const { IdColl } = req.params;
  console.log(req.params);
  try {
    const result = await zchatcoll.findAll({
      where: {
        IdColl,
      },
      include: [
        {
          model: zchat,
          attributes: ["IdCtraCli"],
        },
      ],
    });
    res.json({
      auth: true,
      message: `All chats for coll ${IdColl}  found !`,
      data: result,
    });
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

router.post("/createChat", async (req, res) => {
  try {
    // Extract IdCtraCli from the request body
    const { IdCtraCli } = req.body;

    // Check if IdCtraCli already exists in zchat
    const existingChat = await zchat.findOne({ where: { IdCtraCli } });
    if (existingChat) {
      return res.json({
        auth: true,
        error: true,
        message: `Chat pour ID client ${IdCtraCli} exist déjà`,
      });
    }

    // Create a new entry in zchatcoll table with the provided IdCtraCli
    await zchat.create({
      IdCtraCli,
    });

    const updatedChatList = await zchat.findAll({
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

    // Send the created entry as the response
    res.json({
      auth: true,
      message: `Chat for ${IdCtraCli} created`,
      data: updatedChatList,
    });
  } catch (error) {
    console.error("Error adding collaborator:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to to delete chat from IdChat
router.delete("/delete/:IdChat", async (req, res) => {
  try {
    // Extract IdChat and IdColl from the request body
    const { IdChat } = req.params;

    console.log(IdChat);

    // Delete associated chat messages first
    await zchatmsg.destroy({
      where: {
        IdChat: IdChat,
      },
    });

    // Create a new entry in zchatcoll table with the provided IdChat and IdColl
    const response = await zchat.destroy({
      where: {
        IdChat,
      },
    });

    // Send the created entry as the response
    res.json({
      auth: true,
      message: `Chat ${IdChat} deleted`,
      response: response,
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

// Route to fetch all lines from zchat and include associated IdColl from zchatcoll along with details from zcoll
router.get("/getChat/:IdCtraCli", async (req, res) => {
  const { IdCtraCli } = req.params;
  console.log(req.params);
  try {
    const result = await zchat.findOne({
      where: {
        IdCtraCli,
      },
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
    res.json({
      auth: true,
      message: `IdChat for ${IdCtraCli} found !`,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
