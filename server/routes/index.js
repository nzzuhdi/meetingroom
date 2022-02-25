const routes = require("express").Router();
const authController = require("../controller/authController");
const roomController = require("../controller/roomController");
const errorHandler = require("../middleware/errorHandler");
const authentication = require("../middleware/authentication");
//Auth Routes
routes.post("/register", authController.register);
routes.post("/login", authController.login);
routes.use(authentication);
routes.get("/users", authController.getUsers);

// Room Routes
//CLient
routes.post("/clients", roomController.addClient);
routes.get("/clients", roomController.getClient);

//Room
routes.post("/rooms", roomController.addRoom);
routes.get("/rooms", roomController.getRoom);
routes.get("/rooms/:id", roomController.getRoomDetail);

//Room Usage
routes.get("/roomusages", roomController.getRoomUsage);
routes.post("/roomusages", roomController.addRoomUsage);

routes.use(errorHandler);
module.exports = routes;
