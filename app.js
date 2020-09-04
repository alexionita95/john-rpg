const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});


var clients = [];

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.id = Math.random();
  clients[socket.id] = socket;
  socket.on('chatMsg', function (obj) {
    updateChat({id:Math.floor(socket.id*100), text:obj.message});
  });

  socket.on('clear', function () {
    io.emit('remoteClear', { for: 'everyone' });
  });
  socket.on('disconnect',()=>{
    delete clients[socket.id];
  });
});


http.listen(3000, () => {
  console.log('server running at :3000');
});
function updateChat(message)
{
  for(var id in clients)
  {
    var socket = clients[id];
    socket.emit('chatUpdate',message);
  }
}
setInterval(function(){
  let rnd = Math.random()*10;
  for(var id in clients)
  {
    var socket = clients[id];
    socket.emit('message',{text:rnd});
  }

},2000);