var express = require("express");
var router = express.Router();

//JWT
const filemakerScript = require("../middleware/filemakerScript");

// // ROUTE ON PAGE NEWSADMIN : DELETE NEWS BY ID
router.post("/clientinfo", async function (req, res, next) {
  try {
    console.log("req.body", req.body);

    res.json({
      message: "All names and lastnames found !",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.post("/clientinfo", filemakerScript, async function (req, res, next) {
//   try {
//     console.log("req.body", req.body);

//     res.json({
//       auth: true,
//       message: "All names and lastnames found !",
//       data: clientInfo,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

module.exports = router;
