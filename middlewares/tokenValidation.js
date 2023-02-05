const jwt = require("jsonwebtoken");
const { secret } = require("../config/config.json");
const validateToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];

  try {
    const decoded = jwt.verify(bearerToken, secret);
    if (req.params && req.params.seller_id) {
      if (req.params.seller_id != decoded.seller_id) {
        return res.status(401).json({ message: "Unauthorized Request" });
      }
    } else if (req.params && req.params.buyer_id) {
      if (req.params.buyer_id != decoded.buyer_id) {
        return res.status(401).json({ message: "Unauthorized Request" });
      }
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error Decrypting token" });
  }
};
module.exports = {
  validateToken,
};
