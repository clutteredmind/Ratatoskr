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

const {
    Image,
    loadImage
} = require('canvas');

router.get('/', (req, res) => {
    res.json({
        this: 'is the api'
    });
});

router.post('/mock', (req, res) => {
    if (req.body.stringToMock != undefined) {
        var mockedString = util.mock(req.body.stringToMock);

        var imageFile = fs.readFileSync(path.join(__dirname, '../', 'images', 'sponge.png'));
        var image = new Image();
        image.src = imageFile;
        var newCanvas = new canvas(650, 381);
        var context = newCanvas.getContext('2d');

        // draw the image to the canvas
        context.drawImage(image, 0, 0, image.width, image.height);

        context.strokeStyle = 'rgba(0,0,0,0.5)';
        context.font = '30px Impact';

        var textMetrics = context.measureText(mockedString);
        context.fillText(mockedString, 0, 30);

        res.send({
            url: newCanvas.toDataURL()
        });
    } else {
        logger.log('error', 'Incorrect POST body: ' + JSON.stringify(req.body));
        res.json({
            error: 'Incorrect POST body. Expected "stringToMock"'
        });
    }
});

module.exports = router;