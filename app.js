let  express = require('express');
let cors = require('cors');
let jwt = require('jsonwebtoken');
const mongoose = require("mongoose")
let app = express();
require('dotenv').config()
const path = require('path')
const server = app.listen(4200, () => console.log('estarted'));
const io = require('socket.io')(server)

require('./db/db_connection')
let user  = mongoose.model('users');
app.use(express.static(path.join(__dirname,'public')));

app.use(cors())
app.post('/login',async (req,res)=>{
  try{
  let userinfo = await user.find({'username':req.body.username,'password':req.body.password});
  if(userinfo.length == 1){
    var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
    res.send({
      'username':userinfo[0].username,
      token:token
    })
  }
  else{
    res.send('no result')
  }
}
  catch(e){
   res.send(e)
  }
})

app.use((req,res,next)=>{
    jwt.verify(req.headers.token, 'shhhhh', function(err, decoded) {
      if(decoded?.foo === 'bar'){
        next();
      } 
      else{
        res.send('invalid token')
      }
    });
  })



require('./routes/route')(app)
app.get('/',function(req,res){
  res.send('welcome')
})
//app.listen(4200,()=>console.log('estarted'));
 
let socketsConected = new Set()

io.on('connection', onConnected)

function onConnected(socket) {
  console.log('Socket connected', socket.id)
  socketsConected.add(socket.id)
  io.emit('clients-total', socketsConected.size)

  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id)
    socketsConected.delete(socket.id)
    io.emit('clients-total', socketsConected.size)
  })

  socket.on('message', (data) => {
    // console.log(data)
    socket.broadcast.emit('chat-message', data)
  })

  socket.on('feedback', (data) => {
    socket.broadcast.emit('feedback', data)
  })
}