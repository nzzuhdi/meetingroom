"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoomUsage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoomUsage.belongsTo(models.Client);
      RoomUsage.belongsTo(models.Room);
    }
  }
  RoomUsage.init(
    {
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Client Id is required!",
          },
          notNull: {
            msg: "Client Id is required",
          },
        },
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Room Id is required!",
          },
          notNull: {
            msg: "Room Id is required",
          },
        },
      },
      startTime: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Start Time is required!",
          },
          notNull: {
            msg: "Start Time is required",
          },
        },
      },
      endTime: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "End Time is required!",
          },
          notNull: {
            msg: "End Time is required",
          },
        },
      },
      bookingDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Booking Date is required!",
          },
          notNull: {
            msg: "Booking Date is required",
          },
        },
      },
      quotaUsed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Quota is required!",
          },
          notNull: {
            msg: "Quota is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "RoomUsage",
    }
  );
  return RoomUsage;
};
