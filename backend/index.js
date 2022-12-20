const express = require("express");
const ws = require("ws");
const cors = require("cors");

const app = express();
const server = require("http").createServer(app);

const wss = new ws.Server({
    server: server,
});

server.listen(8080, () => {
    console.log("Webserver läuft und hört auf Port ", 8080); //successful start notification
});

app.use(express.static("../src")); //main web-server

wss.on(
    "connection",
    (connection = (ws) => {
        console.log("A new client Connected!");
        const logEvery200mSeconds = (i400ms) => {
            //loop for realtime stuff
            setTimeout(() => {
                // Tis will be run every 400 ms
                ws.send("Hello from the server!");
                logEvery200mSeconds(++i400ms);
            }, 400);
        };
        logEvery200mSeconds(0);
    })
);
