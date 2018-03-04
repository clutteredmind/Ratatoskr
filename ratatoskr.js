//-----------------------------------------------------------------------
// <copyright file = "ratatoskr.js">
// Copyright (c) 2018 Me!. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

'use strict';

const config = require('./config.json');
const logger = require('./logger');

// create the server
const server = require('./server.js')();

server.use('/api/v1', require('./api/api'));

server.listen(config.httpServerPort, () => {
    logger.log('debug', `Server listening on port ${config.port}...`);
});
