const bcrypt = require("bcrypt");
const {saltRounds} = require('../config/config.json');


async function hashPassword(password) {
  return bcrypt.hash(password, saltRounds);
}

async function comparePasswords(password, hash) {
  return bcrypt.compare(password, hash);
}
module.exports = {
  hashPassword,
  comparePasswords,
};