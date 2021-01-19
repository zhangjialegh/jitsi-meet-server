const sIO = require("socket.io");
let roomMap = {};
function socketIO(server) {
  const io = sIO(server, {
    path: "/nuxt.socket"
  });
  // middleware
  io.use((socket, next) => {
    const { token, room } = socket.handshake.query;
    if (token) {
      if (room) {
        if (!roomMap[room]) {
          roomMap[room] = [];
        }
        return next();
      } else {
        return next(new Error("create room error"));
      }
    }
    return next(new Error("authentication error"));
  });

  io.on("connection", function(socket) {
    const { room, name, id } = socket.handshake.query;
    socket.on("call", function(sts, cb) {
      const roomName = Date.now() + "_" + id;
      const caller = { callerid: id, roomName, name };
      sts.forEach(item => {
        socket.broadcast.emit("call_" + item.id, { ...caller, id: item.id });
      });
      cb({ ...caller, id: id });
    });

    const tar = roomMap[room].find(item => item.id === id);
    if (!tar) {
      roomMap[room].push({
        id: id,
        name
      });
      socket.broadcast.emit(`rooms_${room}`, roomMap[room]);
      socket.emit(`rooms_${room}`, roomMap[room]);
    }
    socket.on("disconnecting", reason => {
      roomMap[room] = roomMap[room].filter(item => item.id !== id);
      socket.broadcast.emit(`rooms_${room}`, roomMap[room]);
      socket.emit(`rooms_${room}`, roomMap[room]);
    });
  });
}

module.exports = socketIO;
