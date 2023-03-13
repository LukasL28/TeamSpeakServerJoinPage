const express = require("express");
const ws = require("ws");
const cors = require("cors");
const { json } = require("express");
require('dotenv').config();

const app = express();
const server = require("http").createServer(app);

const wss = new ws.Server({
    server: server,
});

var data = [{
    Server_Name: process.env.SERVER_NAME, 
    Server_Icon_URL: process.env.SERVER_ICON_URL, 
    Server_Address: process.env.SERVER_ADDRESS, 
    Server_Port: process.env.SERVER_PORT,
    Server_Bookmark: process.env.SERVER_BOOKMARK,
    Server_Password: process.env.SERVER_PASSWORD,
    Join_Channel: process.env.JOIN_CHANNEL,
    Join_Channel_Password: process.env.JOIN_CHANNEL_PASSWORD,
    Token: process.env.TOKEN,
    Favicon: process.env.FAVICON
}]

console.log(data)

server.listen(8080, () => {
    console.log("Webserver läuft und hört auf Port ", 8080); //successful start notification
});

app.use(express.static("../src")); //main web-server

wss.on(
    "connection",
    (connection = (ws) => {
        console.log("A new client Connected!");
        ws.send(JSON.stringify(data));
    })
);