const cors = require("cors");

let io;
module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      cors: {
        credentials: true,
        origin: ["http://localhost:3000", "http://localhost:3001"],
        methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
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
