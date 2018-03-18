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

const apiUtil = require('./api-util');
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
    if (req.body.topText != undefined) {
        let topText = apiUtil.mock(req.body.topText);

        let imageFile = fs.readFileSync(path.join(__dirname, '../', 'images', 'sponge.png'));
        let image = new Image();
        image.src = imageFile;

        let newCanvas = new canvas(image.width, image.height);
        let context = newCanvas.getContext('2d');

        // draw the image to the canvas
        context.drawImage(image, 0, 0, image.width, image.height);

        context.lineWidth = 6;
        context.fillStyle = 'white';
        context.font = '30px Impact';
        context.strokeStyle = 'black';

        let topTextMetrics = context.measureText(topText);

        // add top text
        context.strokeText(topText, (image.width / 2 - topTextMetrics.width / 2), 30);
        context.fillText(topText, (image.width / 2 - topTextMetrics.width / 2), 30);

        // add bottom text, if there is any
        if (req.body.bottomText) {
            let bottomText = apiUtil.mock(req.body.bottomText);
            let bottomTextMetrics = context.measureText(bottomText);
            context.strokeText(bottomText, (image.width / 2 - bottomTextMetrics.width / 2), image.height - 30);
            context.fillText(bottomText, (image.width / 2 - bottomTextMetrics.width / 2), image.height - 30);
        }

        res.send({
            url: newCanvas.toDataURL()
        });
    } else {
        logger.log('error', 'Incorrect POST body: ' + JSON.stringify(req.body));
        res.json({
            error: 'Incorrect POST body. Expected "topText" and optional "bottomText"'
        });
    }
});

module.exports = router;
