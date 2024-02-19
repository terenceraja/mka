const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.json({ auth: false, message: "No token available !" });
  } else {
    const jwtkey = process.env.JWT_SECRET_KEY;

    jwt.verify(token, jwtkey, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Authenfication failed !" });
      } else {
        req.IdCtraCli = decoded.name;
        next();
      }
    });
  }
};

module.exports = verifyJwt;
