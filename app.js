const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const session = require('express-session');

const usersRouter = require('./routes/users');


app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/users",usersRouter);
app.use(session({
  secret:'john-rpg',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 60 * 1000 * 30
  }
}));
app.get('/', (req, res) => {
  var logged=req.session.user ? "Logged in": "Not connected";
  res.render('index',{title:"Hello",loggedin:logged});
});


var clients = [];
var players =[]; 

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

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
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