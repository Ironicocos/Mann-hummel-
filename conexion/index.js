//sockets.js
module.exports = (io) => {
  io.on('connection', () => {
    console.log('A user connected');
  });
}
