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
    // check if port is set, if not use default port
    if (process.env.SERVER_PORT != "" && process.env.SERVER_PORT != null) {
        link += "?port=" + process.env.SERVER_PORT;
    } else {
        link += "?port=9987"; //default port, so the other parameters don't break if no port is set
    }
    if (process.env.SERVER_BOOKMARK != "" && process.env.SERVER_BOOKMARK != null) {
        link += "&addbookmark=" + process.env.SERVER_BOOKMARK;
    }
    if (process.env.SERVER_PASSWORD != "" && process.env.SERVER_PASSWORD != null) {
        link += "&password=" + process.env.SERVER_PASSWORD;
    }
    if (process.env.JOIN_CHANNEL != "" && process.env.JOIN_CHANNEL != null) {
        link += "&channel=" + process.env.JOIN_CHANNEL;
    }
    if (process.env.JOIN_CHANNEL_PASSWORD != "" && process.env.JOIN_CHANNEL_PASSWORD != null) {
        link += "&channelpassword=" + process.env.JOIN_CHANNEL_PASSWORD;
    }
    if (process.env.TOKEN != "" && process.env.TOKEN != null) {
        link += "&token=" + process.env.TOKEN;
    }
    return link;
}

module.exports = data;
