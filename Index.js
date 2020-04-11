//port
const socketPort = 8000;
//including the websocket library
const webSocketServer = require("websocket").server;
const http = require("http");

//creating new web server
const server1 = http.createServer();
server1.listen(socketPort);

//creating new websocket server
const wsServer = new webSocketServer({httpServer: server1});

//including express library
var express = require('express');
var app = express();

//storing name and password
var name = "";
var pass = "";

//listening to the website link
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "reg.htm" );
})
app.get('/node_moduleswebsocket/index.js', function (req, res) {
   res.sendFile( __dirname + "/node_modules\websocket/index.js" );
})

//running the webserver on port x
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

//creating new user id
var cnt = 0;
var allUsers = {};
const genId = () =>
{
	cnt++;
	return cnt.toString();
	
};

// connecting to the client -- handshake
wsServer.on('request', function(request){
		var userId = genId();
		
		console.log("new user " + userId)
		
		const connection = request.accept(null, request.origin);
		allUsers[userId] = connection;
		
		console.log("connected")
		
		//run when recieving a message from the client
		connection.on("message", function(msg){
			//saving the data
			var recieved = JSON.parse(msg.utf8Data);
			name = recieved.name1;
			pass = recieved.pass1;
			console.log(name + " " + pass);
		})
});


// PYTHON IS WAY BETTER