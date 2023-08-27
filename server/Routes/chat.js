const express = require("express");
const chatControllers = require("../Controllers/chat");
const router = express.Router();

router.get("/getlistroom", chatControllers.getListRooms);
router.get("/getmessages/:id", chatControllers.getListMessages);

module.exports = router;
