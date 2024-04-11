var express = require("express");
var router = express.Router();
const { Sequelize } = require("sequelize");

//JWT
const verifyJwt = require("../middleware/jwt");

const { zchatmsg, zchat, zcoll, zchatcoll, zmessage } = require("../models"); // Import your Sequelize model

// SAVE MESSAGE
router.post("/send", async function (req, res, next) {
  try {
    console.log("saving");
    const { IdChat, IdSender, Message, SenderType } = req.body;
    console.log(req.body);

    const result = await zchatmsg.create({
      IdChat: IdChat,
      IdSender: IdSender,
      Message: Message,
      SenderType: SenderType,
    });

    const message = await zchatmsg.findOne({
      where: {
        IdMsg: result.IdMsg,
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

    res.json({
      auth: true,
      message: "Message Saved !",
      data: message,
      status: true,
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

    // Fetch chat messages associated with the found chat ID
    const { IdChat } = chat;

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
    res.json({
      auth: true,
      message: `all msg for IdChat ${IdChat} found!`,
      data: chatMessages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message }); // Send specific error message
  }
});

module.exports = router;
