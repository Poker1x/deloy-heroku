const express = require('express'); 
const http = require('http');
const socketio = require("socket.io");
const data = require("./data");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4000
server.listen(port,() => console.log("Server Runing ..."));
const io = socketio(server);

const find = [];

app.use(express.static("public"))
app.get("/",(req,res) => {
  res.send("index")
});
io.on("connection",socket => {
  console.log(socket.id+" Connect");
  socket.on("disconnect",()=> {
    console.log(socket.id+" Disconnect")
    data.user.remove(socket.id)
    io.sockets.emit("dis",socket.id)
  })
  socket.on("log",(mes,cb) => {
    if(data.user.is(mes)){
      cb(true)
    } else {
      cb(false);
      data.user.add(socket.id,mes);
    }
  });
  
  socket.on("find",mes => {
    
    find.push(mes);
    var arr = [];
    for(var i of find){
      if(i !== socket.id){
        arr.push(i)
      }
    }
    if(arr.length >= 1){
      var getUser = arr[Math.floor(Math.random() * arr.length)];
      io.sockets.emit("finded",{
        id : [socket.id,getUser],
        user : [data.user.get(socket.id),data.user.get(getUser)]
      })
    }
    
  })
  socket.on("rfind",mes => {
    for(var i in find){
      if(find[i] == mes){
        find.splice(i,1)
      }
    }
    console.log(find)
  });
  
  socket.on("chat",(ids,mes) => {
    data.chat.add(ids,mes);
    io.sockets.emit("chat",data.chat.get(ids))
  })
  socket.on("disroom",mes => {
    data.chat.remove(mes);
    console.log(data.chat.get())
  })
  socket.on("sending",mes => {
    io.to(mes).emit("sending");
  })
  socket.on("dissend",mes => {
    io.to(mes).emit("dissend");
  })
});