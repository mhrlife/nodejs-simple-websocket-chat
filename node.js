var websocketConnection = require("websocket").server;
var http = require("http");

var server = http.createServer(function () {
});
server.listen(1337);

var websocket =  new websocketConnection({
   httpServer:server
});

var _sockets = [];
var admins = [];
var admin_auth={
    "admin":"admin"
}

websocket.on("request",function(request){
    var socket = request.accept(null , request.origin);
    var index = _sockets.push(socket)-1;
    socket.tIndex = index;
    socket.on("close",function(connection){
        _sockets.splice(index,1);
    });
    socket.on("message",function(data){
        var message = data.utf8Data;
        console.log(index +" : "+message);
        try{
            var messageObject = JSON.parse(message);
            if(typeof  messageObject.action == "string"){

                var sMessage = messageObject.message;

                switch (messageObject.action){

                    case "login":{
                        if(typeof admin_auth[sMessage] == "string"){
                            socket.isAdmin = 1;
                            socket.adminToken = (Math.floor(Math.random()*100)).toString();
                            socket.username = sMessage;
                            socket.sendUTF(JSON.stringify({
                                type:"adminAuth",
                                token: socket.adminToken
                            }));
                        }else{
                            socket.username = sMessage;
                            sendWelcome(socket);
                        }
                    }break;


                    case "msg":{

                        var act = sMessage.split(" ")[0];

                        switch (act){
                            case "/USERS":{
                                var users = "";
                                _sockets.forEach(function (sok) {
                                    users+="<br/>"+sok.username+" [ID:"+sok.tIndex+"] ";
                                });
                                sendToSocket(socket,users,"black","18");

                            }break;
                            case "/HELP":{
                                if(socket.isAdmin == 2){
                                    var users = " <br/>/USERS : list of users <br/> /HELP : this page :) <br/> /KICK [id] : kick user";
                                }else {
                                    var users = "<br/>/USERS : list of users <br/> /HELP : this page :)";
                                }
                                sendToSocket(socket,users,"black","18");

                            }break;
                            case "/KICK":{
                                if( typeof  socket.isAdmin =="number" && socket.isAdmin == 2) {
                                    var kick_index = sMessage.split(" ")[1];
                                    try {
                                        sendToAll("user " + _sockets[kick_index].username + " [ " + _sockets[kick_index].tIndex + " ] were kicked by <b> " + socket.username + " </b>")
                                        sendToSocket(_sockets[kick_index], "YOU WERE KICKED !", "red", 24);
                                        _sockets[kick_index].kicked = 1;
                                        _sockets.splice(kick_index, 1);
                                    } catch (e) {
                                        console.log(e.toString());
                                    }
                                }else{
                                    sendToSocket(socket,"you are not admin .","red",16);
                                }
                            }break;
                            default:{
                                if(typeof socket.kicked == "number" && socket.kicked == 1){

                                    sendToSocket(socket,"you are kicked ! do not try !","red",18);

                                }else {
                                    console.log(socket.tIndex);
                                    sendToAllbyUser(sMessage, "#333", 14, socket);
                                }
                            }break;
                        }
                    }break;

                    case "adminPw":{
                        if(typeof  socket.isAdmin == "number"){
                            if(messageObject.token == socket.adminToken && messageObject.message == admin_auth[socket.username]){
                                socket.isAdmin = 2;
                                sendWelcome(socket);
                            }else wrongAdminPw(socket);
                        } else wrongAdminPw(socket);
                    }break;

                    default:{
                        console.log("what?! "+messageObject.action);
                    }break;

                }

            }else{
                sendError(socket,"wrong format.");
                console.log("index "+index+" sent wrong message .");
            }

        }catch (e){
            sendError(socket, e.toString());
        }
    });
});


function sendError(socket,error){
    socket.sendUTF(JSON.stringify({
        color:"tomato",
        fontSize:"12",
        message:" Error : "+ error,
        type:"error"
    }));
}

function sendWelcome(socket){
    socket.sendUTF(JSON.stringify({
        type:"welcome",
        username:socket.username
    }));
    sendToAll("Welcome "+socket.username+" ["+socket.tIndex+"] ","#666",12);
}

function sendToAll(message , fontcolor, size){
    _sockets.forEach(function(socket){
        socket.send(JSON.stringify({
            type:"s2a",
            message:"CONSOLE: "+message,
            fontColor:fontcolor,
            fontSize:size
        }));
    });
}
function sendToAllbyUser(message , fontcolor, size , socket2){

    _sockets.forEach(function(socket){
        socket.send(JSON.stringify({
            type:"s2a",
            message:socket2.username+"[ "+socket2.tIndex+" ] : "+message,
            fontColor:fontcolor,
            fontSize:size
        }));
    });
}

function sendToSocket(socket , message , fontcolor, size){
        socket.send(JSON.stringify({
            type:"s2a",
            message:"CONSOLE: "+message,
            fontColor:fontcolor,
            fontSize:size
        }));
}

function wrongAdminPw(socket){

    socket.send(JSON.stringify({

        type:"adminWrongPW"

    }));

}
