var express = require("express");
var router = express.Router();
//JWT
const verifyJwt = require("../middleware/jwt");

const { zmessage } = require("../models"); // Import your Sequelize model

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

// ROUTE ON PAGE DOC : GET DEMAND DOCS VIA IdCLI IdMANAGER
router.post("/get", verifyJwt, async function (req, res, next) {
  try {
    const { IdChat } = req.body;
    const chat = await zmessage.findAll({
      where: {
        IdChat: IdChat,
      },
      order: [["TimeStampCreation", "ASC"]], // ASC for ascending, DESC for descending
    });

    res.json({ auth: true, message: "Chat found !", data: chat }); // Send the result as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
