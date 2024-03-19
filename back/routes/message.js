var express = require("express");
var router = express.Router();
const { Sequelize } = require("sequelize");

//JWT
const verifyJwt = require("../middleware/jwt");

const { zchatmsg, zchat, zcoll, zchatcoll, zmessage } = require("../models"); // Import your Sequelize model

// SAVE MESSAGE
router.post("/send", verifyJwt, async function (req, res, next) {
  try {
    console.log("saving");
    const { IdChat, IdSender, Message } = req.body;
    console.log(req.body);

    const result = await zmessage.create({
      IdChat: IdChat,
      IdSender: IdSender,
      Message: Message,
    });

    console.log("RESPONSE", result);

    res.json({
      auth: true,
      message: "Message Saved !",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// ROUTE TO GET CHAT MESSAGES BY CLIENT ID
router.get("/:IdCtraCli", async function (req, res, next) {
  try {
    const { IdCtraCli } = req.params;

    // Find the chat associated with the provided client ID
    const chat = await zchat.findOne({
      where: {
        IdCtraCli: IdCtraCli,
      },
    });

    // If chat doesn't exist, return an error message
    if (!chat) {
      return res.json({
        auth: true,
        error: true,
        message: "Configuration chat requise côté support : Création chat",
        description: `Chat for ${IdCtraCli} not created `,
      });
    }

    // Fetch chat messages associated with the found chat ID
    const { IdChat } = chat;

    const chatcoll = await zchatcoll.findAll({
      where: { IdChat: IdChat },
    });

    console.log(chatcoll);

    if (chatcoll.length === 0) {
      return res.json({
        auth: true,
        error: true,
        message:
          "Configuration chat requise côté support : Importation collaborateurs",
        description: `No Collobarators in chat with ${IdCtraCli} `,
      });
    }

    const chatMessages = await zchatmsg.findAll({
      where: {
        IdChat: IdChat,
      },
      include: [
        {
          model: zcoll,
          required: false,
          where: { IdColl: Sequelize.col("zchatmsg.IdSender") }, // Correct reference to IdSender
          as: "Collaborator",
        },
      ],
      order: [["TimeStampCreation", "ASC"]], // ASC for ascending, DESC for descending
    });

    // Send the chat messages as the response
    res.json({ auth: true, message: "Chat found!", data: chatMessages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message }); // Send specific error message
  }
});

module.exports = router;
