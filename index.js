/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 06 2022 23:39:01 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

const { isDevEnv, serverUrl } = require("./utils");
// check for prod or dev environment
// if dev import dotenv
if (isDevEnv()) {
    require("dotenv").config();
}

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 4444;

// create express app
const app = express();
// use for security
app.use(helmet());
// use for cross origin resource sharing
app.use(cors());
// use for logging the requests
app.use(morgan('dev'));
// use for parsing the body of the request
app.use(express.json());

// public routes
app.use('/paypal', require('./routes/paypal'));

// Print sevrer IP and PORT
app.listen(PORT, () => {
    const url = serverUrl(PORT);

    console.log(`Server started on network:\t${url.network}`);

    if (isDevEnv()) {
        console.log(`Server started on local:\t${url.local}`);
    }
});
