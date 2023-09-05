const cors = require("cors");
require("dotenv").config();
//function để lưu connect socket và có thể sử dụng io ở những nơi khác sau khi connect
let io;
module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: [process.env.CLIENT_APP, process.env.ADMIN_APP],
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized");
    }
    return io;
  },
};
