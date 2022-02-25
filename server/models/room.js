"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.hasMany(models.RoomUsage);
    }
  }
  Room.init(
    {
      roomName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Room's Name is required!",
          },
          notNull: {
            msg: "Room's Name is required",
          },
        },
      },
      costPerHour: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Cost is required!",
          },
          notNull: {
            msg: "Cost is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
