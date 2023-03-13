const express = require("express");
const ws = require("ws");
const cors = require("cors");
const { json } = require("express");

const data = require("./js/staticdata.js");

const app = express();
const server = require("http").createServer(app);

const wss = new ws.Server({
    server: server,
});

console.log(data)

server.listen(8080, () => {
    console.log("Webserver läuft und hört auf Port ", 8080); //successful start notification
});

app.use(express.static("../src")); //main web-server

wss.on(
    "connection",
    (connection = (ws) => {
        ws.send(JSON.stringify(data));
    })
);