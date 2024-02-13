var express = require("express");
var router = express.Router();

//TESTING IIS NODE
router.get("/", function (req, res) {
  res.send("Express is working on IISNode!");
});

module.exports = router;
