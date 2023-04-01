const express = require("express");
const { get } = require("https");
const data = require("./js/staticdata.js");
const live_data = require("./js/live-data.js");
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

let stats = null;

if (
    process.env.SERVER_QUARRY_API_KEY == null ||
    process.env.SERVER_QUARRY_API_KEY == ""
) {
    console.log("SERVER_QUARRY_KEY is not set!");
    stats = "disabled";
} else {

    let calculate_online_mode = process.env.CALCULATE_ONLINE_MODE;
    let calculate_slots_mode = process.env.CALCULATE_SLOTS_MODE;

    if (calculate_online_mode == null || calculate_online_mode == "") {
        calculate_online_mode = "exclude_quarry";
    }

    if (calculate_slots_mode == null || calculate_slots_mode == "") {
        calculate_slots_mode = "exclude_reserved";
    }

    async function get_live_data(req, res) {
        stats =
            (await live_data.calculate_online(calculate_online_mode)) +
            "," +
            (await live_data.calculate_slots(calculate_slots_mode)) +
            "," +
            (await live_data.get_status());
    }

    setInterval(() => {
        get_live_data();
    }, 2000);
}

app.get("/live-data", async function (req, res) {
    res.send(JSON.stringify(stats));
});
