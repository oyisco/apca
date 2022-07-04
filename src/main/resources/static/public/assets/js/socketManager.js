var serverIP = "192.168.43.114:3000";

var socket = io(serverIP);
socket.on('connect', function(){

        console.log("connected to socket ")
});
socket.emit("saveConnectedUser", {id: userId});
socket.on('socket-id', function(data){
    console.log("socket connected", data);
});

socket.on('new-delivery-request', function(data){
    //add this request to the list 
    //trigget new notifications. 
    console.log("delivery request", data);
});


socket.on('disconnect', function(){});