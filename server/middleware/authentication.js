const { verifyToken } = require("../helper/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  const { access_token } = req.headers;
  try {
    const payload = verifyToken(access_token);
    if (!payload) {
      throw { name: "Unauthorized" };
    }
    const user = await User.findOne({ where: { email: payload.email } });
    req.user = { id: user.id, email: user.email };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
