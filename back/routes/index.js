var express = require("express");
var router = express.Router();

const { zctracli, zctraptf, zope, zlignptf, zmvt } = require("../models"); // Import your Sequelize model

// ROUTE CLICK LOGIN GET ID USER
router.post("/zctracli", async function (req, res, next) {
  try {
    const { login, password } = req.body;

    const user = await zctracli.findOne({
      where: {
        Login_lmt: login,
        Password_lmt: password,
      },
    });

    console.log(user);
    if (!user) {
      res.json({
        message: "Identifiants incorrects, veuillez réessayer.",
        data: user,
      });
    } else {
      res.json({
        message: "User found !",
        IdCtraCli: user.IdCtraCli,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ROUTE ON PAGE PTF : POST USER ID AND GET PTFS
router.post("/zctraptf", async function (req, res, next) {
  try {
    const { IdCtraCli } = req.body;

    const ptfs = await zctraptf.findAll({
      where: {
        IdCtraCli: IdCtraCli,
      },
    });

    // Assuming ptfs is an array of objects
    const totMV = ptfs.reduce(
      (acc, obj) => acc + parseFloat(obj.MktValAaiDevCLIAuc_lcn),
      0
    );

    res.json({ message: "Portfolios found !", data: ptfs, totMV: totMV }); // Send the result as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ROUTE ON PAGE PTF : POST PTFs ID AND GET ALL OPE
router.post("/zope", async function (req, res, next) {
  try {
    const { IdCtraPtf } = req.body;

    const ope = await zope.findAll({
      where: {
        IdCtraPtf: IdCtraPtf,
      },
    });

    res.json({ message: "Operations found !", data: ope }); // Send the result as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ROUTE ON PAGE DETPTF : POST PTF ID AND GET ALL LIGN
router.post("/zlignptf", async function (req, res, next) {
  try {
    console.log(req.body);
    const { IdCtraPtf } = req.body;
    console.log("id", IdCtraPtf);
    const ligns = await zlignptf.findAll({
      where: {
        IdCtraPtf: IdCtraPtf,
      },
      order: [["LangueNomLocalAlloc_lmt", "ASC"]], // ASC for ascending, DESC for descending
    });
    res.json({ message: "Ligns found !", data: ligns }); // Send the result as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ROUTE ON PAGE DETPTF : POST PTF ID AND GET ALL LIGN
router.post("/zmvt", async function (req, res, next) {
  try {
    const { IdCtraPtf, IdAsset } = req.body;
    console.log(req.body);

    const mvt = await zmvt.findAll({
      where: {
        IdPtf: IdCtraPtf,
        idAsset: IdAsset,
      },
      order: [["CptaDateOPE_lsd", "DESC"]], // ASC for ascending, DESC for descending
    });

    res.json({ message: "Mvt found !", data: mvt }); // Send the result as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
