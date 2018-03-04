//-----------------------------------------------------------------------
// <copyright file = "server.js">
// Copyright (c) 2018 Me!. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

'use strict';

const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const rotatingFileStream = require('rotating-file-stream');

const config = require('./config.json');

function makeServer() {

    const app = express();

    // set up body parser middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // ensure log directory exists
    var logDirectory = path.join(__dirname, config.logDirectoryName);
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

    // create a rotating write stream
    var accessLogStream = rotatingFileStream(config.morganLogFileName, {
        interval: config.logRotateInterval,
        path: logDirectory
    });

    // add the logging middleware
    app.use(morgan(config.morganLogFileFormat, {
        stream: accessLogStream
    }));

    // the public static files
    app.use(express.static(config.staticFileDirectoryName));

    return app;
}

module.exports = makeServer;