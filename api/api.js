//-----------------------------------------------------------------------
// <copyright file = "api.js">
// Copyright (c) 2018 Me!. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

'use strict';

const fs = require('fs');
const path = require('path');
const canvas = require('canvas');
const router = require('express').Router();

const util = require('./api-util');
const logger = require('../logger');

router.get('/', (req, res) => {
    res.json({
        this: 'is the api'
    });
});

router.post('/mock', (req, res) => {
    if (req.body.stringToMock != undefined) {
        res.json({
            mockedString: util.mock(req.body.stringToMock)
        });
    } else {
        logger.log('error', 'Incorrect POST body: ' + JSON.stringify(req.body));
        res.json({
            error: 'Incorrect POST body.'
        });
    }
});

module.exports = router;