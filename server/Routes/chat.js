const express = require("express");
const chatControllers = require("../Controllers/chat");
const router = express.Router();

router.post("/send", chatControllers.sendMessage);

module.exports = router;
