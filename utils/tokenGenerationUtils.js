const jwt = require("jsonwebtoken");
const { secret } = require("../config/config.json");
async function generateToken(payload) {
  const token = await jwt.sign(payload, secret, { expiresIn: "1h" });
  console.log("Token", token);
  return token;
}
module.exports = {
  generateToken,
};
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//   .eyJidXllcnNfaWQiOjUsInNlbGxlcl9pZCI6bnVsbCwiaWF0IjoxNjc1NTM4MjA5LCJleHAiOjE2NzU1NDE4MDl9
//   .xJD9Nw3BYqFQ5VO2kNdDWncw - DGBAck7VstKZPAfgXk;
