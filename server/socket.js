const sIO = require("socket.io");
let rooms = [];
function socketIO(server) {
  const io = sIO(server, {
    path: "/custom"
  });
  // middleware
  io.use((socket, next) => {
    let token = socket.handshake.query.token;
    if (token) {
      return next();
    }
    return next(new Error("authentication error"));
  });

  io.on("connection", function(socket) {
    socket.on("call", function(sts, cb) {
      const name = Date.now() + "_" + socket.id;
      const caller = { callerid: socket.id, name };
      sts.forEach(item => {
        socket.broadcast.emit("call_" + item.id, { ...caller, id: item.id });
      });
      cb({ ...caller, id: socket.id });
    });

    rooms.push({
      id: socket.id
    });
    socket.broadcast.emit("rooms", rooms);
    socket.emit("rooms", rooms);

    socket.on("disconnecting", reason => {
      rooms = rooms.filter(item => item.id !== socket.id);
      socket.broadcast.emit("rooms", rooms);
      socket.emit("rooms", rooms);
    });
  });
}

module.exports = socketIO;
