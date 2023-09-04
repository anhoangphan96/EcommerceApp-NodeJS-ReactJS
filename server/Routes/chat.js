const express = require("express");
const chatControllers = require("../Controllers/chat");
const router = express.Router();
const authorization = require("../Controllers/authorization");

//Lấy list room để hiển thị ở trang adminpage (nên chỉ cần authorize role counselor trở lên)
router.get(
  "/getlistroom",
  authorization.counselorRoleAuthor,
  chatControllers.getListRooms
);
//Lấy list message dựa vào userId (ở trên client), clientId (ở trang admin) nên cần authorize role client trở lên
router.get(
  "/getmessages/:id",
  authorization.clientRoleAuthor,
  chatControllers.getListMessages
);

module.exports = router;
