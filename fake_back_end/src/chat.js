import socketio from 'socket.io';
import config from '../config';
import net from 'net';
// var io = socketio.listen();

var io = socketio(net ,{path:`${config.rootUrl}/message`});

net.createServer(function (socket) {
  console.log('socket connected');
  socket.on('data', function(data) {
    var line = data.toString();
    console.log('got "data"', line);
    // socket.pipe(writable);
    io.sockets.emit('emit_from_server', line); // socket.io呼び出し
  });

  socket.on('end', function() {
    console.log('end');
  });

  socket.on('close', function() {
    console.log('close');
  });

  socket.on('error', function(e) {
    console.log('error ', e);
  });

  socket.write('hello from tcp server');

}).listen(config.socketPort, function() {
  console.log(`TCP Server is listening on port ${config.socketPort}`);
});
