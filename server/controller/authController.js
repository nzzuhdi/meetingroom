const { User, sequelize } = require("../models");
const { comparePass } = require("../helper/bcrypt");
const { signToken } = require("../helper/jwt");

class authController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const createdUser = await User.create({ name, email, password });
      if (createdUser) {
        res.status(201).json({
          id: createdUser.id,
          email: createdUser.email,
          username: createdUser.name,
        });
      }
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "InvalidEmail" };
      }
      if (!password) {
        throw { name: "InvalidPassword" };
      }
      const founUser = await User.findOne({ where: { email } });
      if (founUser) {
        const compared = comparePass(password, founUser.password);
        if (compared) {
          const access_token = signToken({
            id: founUser.id,
            email: founUser.email,
          });
          res.status(200).json({ access_token: access_token });
        } else {
          throw { name: "CannotLogin" };
        }
      } else {
        throw { name: "CannotLogin" };
      }
    } catch (err) {
      next(err);
    }
  }
  static async getUsers(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
        order: [["updatedAt", "DESC"]],
      });
      if (users) {
        res.status(200).json(users);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = authController;
