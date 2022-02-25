const { Client, Room, RoomUsage } = require("../models");

class roomController {
  static async addClient(req, res, next) {
    try {
      const { name, email, phone, credit } = req.body;
      const payload = { name, email, phone, credit };
      const result = await Client.create(payload);
      if (result) {
        res
          .status(201)
          .json({ message: "success add client", data: { name: result.name } });
      }
    } catch (error) {
      next(error);
    }
  }
  static async getClient(req, res, next) {
    try {
      const result = await Client.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {}
  }

  static async addRoom(req, res, next) {
    try {
      const { roomName, costPerHour } = req.body;
      const addRoom = await Room.create({
        roomName,
        costPerHour,
      });
      if (addRoom) {
        res.status(201).json({
          message: "success add room",
          data: { roomName, costPerHour },
        });
      }
    } catch (error) {}
  }
  static async getRoom(req, res, next) {
    try {
      const result = await Room.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }
  static async getRoomDetail(req, res, next) {
    try {
      const { id } = req.params;
      console.log("masuk", id);
      const room = await Room.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (room) {
        res.status(200).json(room);
      } else {
        throw { name: "notFound" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async addRoomUsage(req, res, next) {
    try {
      const { clientId, roomId, startTime, endTime, bookingDate, quotaUsed } =
        req.body;
      const addRoomUsafe = await RoomUsage.create({
        clientId,
        roomId,
        startTime,
        endTime,
        bookingDate,
        quotaUsed,
      });
      if (addRoomUsafe) {
        res.status(201).json({
          message: "success add room",
          data: {
            clientId,
            roomId,
            startTime,
            endTime,
            bookingDate,
            quotaUsed,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }
  static async getRoomUsage(req, res, next) {
    try {
      console.log("masuk");
      const result = await RoomUsage.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getRoomUsageDetail(req, res, next) {
    try {
      const { id } = req.params;
      console.log("masuk", id);
      const roomUsage = await RoomUsage.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (roomUsage) {
        res.status(200).json(roomUsage);
      } else {
        throw { name: "notFound" };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = roomController;
