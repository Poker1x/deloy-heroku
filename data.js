var listUser = [];
var listRoom = [];
var listChat = []

var fuser = {};
var fchat = {};


/*
[{
  id : a,
  list : [
    {
      user : n,
      mes : b
    }
  ]
}]
*/


fuser.get = (id) => {
  if(id){
    return listUser.find(e => { return e.id == id });
  } else {
    return listUser;
  }
}
fuser.add = (id,user) => {
  listUser.push({
    id : id,
    user : user
  });
}
fuser.remove = (id) => {
  for(var i in listUser){
    if(listUser[i].id == id){
      listUser.splice(i,1)
    }
  }
}
fuser.is = (user) => {
  var arr = [];
  for(var i of listUser){
    arr.push(i.user)
  }
  return arr.includes(user)
}
/*
// room 

function get(id){
  if(id){
    return listRoom.find(e => { return e.id == id });
  } else {
    return listRoom;
  }
}
function radd(name){
  listRoom.push({
    id : listRoom.length,
    name : name
  });
}
function rremove(id){
  for(var i in listRoom){
    if(listRoom[i].id == id){
      listRoom.splice(i,1)
    }
  }
}
function ris(user){
  var arr = [];
  for(var i of listRoom){
    arr.push(i.id)
  }
  return arr.includes(user)
}
*/
// chat 
fchat.find = (id) => {
  for(var i in listChat){
    if(listChat[i].id == id){
      return i;
    }
  }
}
fchat.add = (id,mes) => {
  if(fchat.find(id) != undefined){
    var num = fchat.find(id);
    listChat[num].list.push(mes)
  } else {
    listChat.push({
      id : id,
      list : [mes]
    })
  }
}
fchat.get = (id) => {
  if(id){
    return listChat.find(e => { return e.id == id });
  } else {
    return listChat;
  }
}
fchat.remove = (id) => {
  listChat.splice(fchat.find(id),1)
}


module.exports = {
  user : fuser,
  chat : fchat
}