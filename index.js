
const fs = require('fs');
const https = require('https');
var path = require('path');
const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;

// Yes, SSL is required
const serverConfig = {
   // key: fs.readFileSync('server.key'),
   // cert: fs.readFileSync('server.crt'),
};

var express = require('express');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;
app.set('port', port);
app.use(express.static(__dirname));
app.get('/', function(req, res) {
    // ejs render automatically looks in the views folder
    res.sendFile(__dirname + '/index.html');
});

app.listen(app.get('port'), function() {
    console.log('Our app is running on http://localhost:' + port);
});


// ----------------------------------------------------------------------------------------
//
// // Create a server for handling websocket calls
// var wss = new WebSocketServer({server: httpsServer});
//
// wss.on('connection', function(ws) {
//     ws.on('message', function(message) {
//         // Broadcast any received message to all clients
//         console.log('received: %s', message);
//         wss.broadcast(message);
//     });
// });
//
// wss.broadcast = function(data) {
//     this.clients.forEach(function(client) {
//         if(client.readyState === WebSocket.OPEN) {
//             client.send(data);
//         }
//     });
// };
//
// console.log('Server running. Visit https://localhost:' + HTTPS_PORT + ' in Firefox/Chrome (note the HTTPS; there is no HTTP -> HTTPS redirect!)');