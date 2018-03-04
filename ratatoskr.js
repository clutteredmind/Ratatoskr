//-----------------------------------------------------------------------
// <copyright file = "ratatoskr.js">
// Copyright (c) 2018 Me!. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

'use strict';

const fs = require('fs');
const path = require('path');
const app = require('express')();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const rotatingFileStream = require('rotating-file-stream');

const config = require('./config.json');
const logger = require('./logger');

// set up body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// ensure log directory exists
var logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
var accessLogStream = rotatingFileStream('http-access.log', {
    interval: '1d',
    path: logDirectory
});

// add the logging middleware
app.use(morgan('combined', {stream: accessLogStream}));

app.get('/', (req, res) => {
    res.json({
        this: 'is a placeholder'
    });
});

app.use('/api/v1', require('./api/api'));

app.listen(config.port, () => {
    logger.log('debug', `Server listening on port ${config.port}...`);
});
