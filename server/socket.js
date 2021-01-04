const sIO = require("socket.io");
const rooms = []
function socketIO (server) {
  const io = sIO(server, {
    path: '/custom'
  })
  // middleware
  io.use((socket, next) => {
    let token = socket.handshake.query.token;
    if (token) {
      return next();
    }
    return next(new Error("authentication error"));
  });

  io.on("connection", function(socket) {
    socket.on('xxxxxx', function(data) {
      console.log(data,  "disconnect");
      // socket.emit(socket.handshake.query.listener, 're send')
      // rooms = rooms.filter(item => item.id !== data.id)
      // socket.broadcast.emit('rooms', rooms)
      // socket.emit('rooms', rooms)
    });
    rooms.push({
      id: socket.id,
    })
    // socket.on('disconnecting', (reason) => {
    //   console.log(reason, "disconnect");
    // });
    socket.broadcast.emit('rooms', rooms)
    socket.emit('rooms', rooms)
    console.log(socket.rooms, "connection");
  });
}

module.exports = socketIO
