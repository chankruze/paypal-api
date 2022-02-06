/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 06 2022 23:41:26 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

const os = require("os");

const isDevEnv = () =>
    process.NODE_ENV === 'development' ||
    process.NODE_ENV === 'dev' ||
    process.NODE_ENV !== "production";

const serverUrl = (PORT) => {
    const networkInterfaces = os.networkInterfaces();
    let SERV_URL = networkInterfaces.eth0[0].address;
    return {
        network: `http://${SERV_URL}:${PORT}`,
        local: `http://localhost:${PORT}`
    };
}

module.exports = { isDevEnv, serverUrl };
