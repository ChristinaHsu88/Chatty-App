// server.js

const express = require('express');
const SocketLib = require('ws');
const SocketServer = SocketLib.Server;
//const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

// keep the count of the clients online


let clientNum = {num: 0};
//set the color theme
function colorSetting() {
  const color = ['#DB4837', '#3075e5', '#9630e5', '#e53030'];
  const num = Math.floor(Math.random() * 4); 
  const pickedColor = color[num];
  return pickedColor;
}

//broadcast function
function broadcast(msg) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketLib.OPEN) {
      client.send(JSON.stringify(msg));
    }
  })
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  //tracking the numbers of online users
  clientNum.num += 1;
  clientNum.id = uuidv4();
  const color = colorSetting();
  clientNum.color = color;
  clientNum.type = 'onlineNums';
  broadcast(clientNum);

  ws.on('message', (msg) => {
    const parsedMsg = JSON.parse(msg);
    if (parsedMsg.type === 'postMessage') {
      parsedMsg.id = uuidv4();
      parsedMsg.type = "incomingMessage";
  
      broadcast(parsedMsg);
    }
    if (parsedMsg.type === 'postNotification') {
      parsedMsg.id = uuidv4();
      parsedMsg.type = 'incomingNotification';
      console.log('new username', parsedMsg);

      broadcast(parsedMsg);
    }
  })
 
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    clientNum.num -= 1;
    clientNum.id = uuidv4();
    clientNum.type = 'closing windows';

    broadcast(clientNum);
    console.log('Client disconnected')});
});