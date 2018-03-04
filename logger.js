//-----------------------------------------------------------------------
// <copyright file = "logger.js">
// Copyright (c) 2018 Me!. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

'use strict';

const fs = require('fs');
const path = require('path');
const winston = require('winston');

// make sure the log directory exists and create it if it doesn't
const logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// set up Winston
const logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            // name chosen arbitrarily. it doesn't seem to get used anywhere
            name: 'log-file',
            filename: path.join(logDirectory, 'ratatoskr.log'),
            // limit log file size to 2MB
            maxsize: 2000000,
            // keep a maximum of 5 files
            maxFiles: 5,
            // "silly" catches all log message levels
            level: 'silly'
        })
    ]
});

module.exports = logger;
