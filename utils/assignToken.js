const jwt = require("jsonwebtoken");


const assignToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
}

module.exports = {
    assignToken,
}