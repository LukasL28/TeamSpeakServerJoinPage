require("dotenv").config();

var data = [
    {
        Server_Name: process.env.SERVER_NAME,
        Server_Icon_URL: process.env.SERVER_ICON_URL,
        url: create_link(),
        Favicon: process.env.FAVICON,
        Title: process.env.TITLE,
    },
];

function create_link() {
    var link = "ts3server://" + process.env.SERVER_ADDRESS;
    if (process.env.SERVER_PORT != "") {
        link += "?port=" + process.env.SERVER_PORT;
    } else {
        link += "?port=9987"; //default port, so the other parameters don't break if no port is set
    }
    if (process.env.SERVER_BOOKMARK != "") {
        link += "&addbookmark=" + process.env.SERVER_BOOKMARK;
    }
    if (process.env.SERVER_PASSWORD != "") {
        link += "&password=" + process.env.SERVER_PASSWORD;
    }
    if (process.env.JOIN_CHANNEL != "") {
        link += "&channel=" + process.env.JOIN_CHANNEL;
    }
    if (process.env.JOIN_CHANNEL_PASSWORD != "") {
        link += "&channelpassword=" + process.env.JOIN_CHANNEL_PASSWORD;
    }
    if (process.env.TOKEN != "") {
        link += "&token=" + process.env.TOKEN;
    }
    return link;
}

module.exports = data;
