require('dotenv').config();

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

module.exports = data;