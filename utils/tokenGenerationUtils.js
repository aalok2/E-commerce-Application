const jwt = require("jsonwebtoken");
const { secret } = require("../config/config.json");
async function generateToken(payload) {
  const token = await jwt.sign(payload, secret, { expiresIn: "1h" });
  return token;
}
module.exports = {
  generateToken,
};
