require("dotenv").config();
const http = require("http");

let server_quarry_url = process.env.SERVER_QUARRY_URL
let server_quarry_port = process.env.SERVER_QUARRY_PORT
let server_quarry_api_key = process.env.SERVER_QUARRY_API_KEY
let virtual_server_id = process.env.VIRTUAL_SERVER_ID

if (server_quarry_port == null || server_quarry_port == "") {
    server_quarry_port = "8080";
}

if (virtual_server_id == null || virtual_server_id == "") {
    virtual_server_id = "1";
}

url = "http://"+server_quarry_url+":"+server_quarry_port+"/"+virtual_server_id+"/serverinfo?api-key="+server_quarry_api_key;

function getServerInfo() {
    return new Promise((resolve, reject) => {
        http.get(url, (response) => {
            let data = "";
            response.on("data", (chunk) => {
                data += chunk;
            });
            response.on("end", () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (error) {
                    reject(error);
                }
            });
        }).on("error", (error) => {
            reject(error);
        });
    });
}

async function calculate_slots(mode) {
    try {
        const serverInfo = await getServerInfo();
        switch (mode) {
            case "all":
                return serverInfo.body[0].virtualserver_maxclients;
            case "exclude_reserved":
                return (
                    serverInfo.body[0].virtualserver_maxclients -
                    serverInfo.body[0].virtualserver_reserved_slots
                );
            case "separate":
                return (
                    serverInfo.body[0].virtualserver_maxclients +
                    "/-(" +
                    serverInfo.body[0].virtualserver_reserved_slots +
                    ")"
                );
            default:
                return "ERROR: Unknown mode";
        }
    } catch (error) {
        console.error(error);
    }
}

async function calculate_online(mode) {
    try {
        const serverInfo = await getServerInfo();
        switch (mode) {
            case "all":
                return serverInfo.body[0].virtualserver_clientsonline;
            case "exclude_quarry":
                return (
                    serverInfo.body[0].virtualserver_clientsonline -
                    serverInfo.body[0].virtualserver_queryclientsonline
                );
            default:
                return "ERROR: Unknown mode";
        }
    } catch (error) {
        console.error(error);
    }
}

async function get_status() {
    try {
        const serverInfo = await getServerInfo();
        return serverInfo.body[0].virtualserver_status;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    calculate_slots,
    calculate_online,
    get_status,
};
