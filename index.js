const Socket = require('socket.io');
const SerialPort = require('serialport');
const express = require('express');
const Readline = require('@serialport/parser-readline')

const app = express();
SerialPort.list().then(console.log);

// connect to crossaint
const path = '/dev/cu.usbmodem14501';
const port = new SerialPort(path, { baudRate: 9600 });
const parser = new Readline();
port.pipe(parser)

const a = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']; 
const b = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '\n']; 
const c = ['\n', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '?', '\n'];
const keyboard = a.concat(b,c);

let sendData = (data) => {
  io.emit('data', data);
  // const numbers = data.split(' ')[0].split('\t').map(n => parseInt(n));
  // const min = Math.min(...numbers);
  // const idx = numbers.indexOf(min);
  // if (min < 300) {
  //   console.log(min, idx, keyboard[idx]);
  //   return keyboard[idx];
  // }
};

parser.on('data', line => {
    sendData(line);
});

port.write('ROBOT POWER ON\n')
//> ROBOT ONLINE

var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', (reason) => {
    console.log(reason);
  });
  // sendData = (data) => {
  //   socket.emit('data', data);
  //   console.log(socket);
  // }
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});