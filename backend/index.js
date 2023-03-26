const express = require("express");

const data = require("./js/staticdata.js");

const app = express();
const server = require("http").createServer(app);

console.log(data);

server.listen(8080, () => {
    console.log("Webserver läuft und hört auf Port ", 8080); //successful start notification
});

app.use(express.static("../dist")); //main web-server

app.get("/static-data", function (req, res) {
    res.send(JSON.stringify(data));
});
