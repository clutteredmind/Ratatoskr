//-----------------------------------------------------------------------
// <copyright file = "api-util.js">
// Copyright (c) 2018 Me!. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

'use strict';

function mock(newString) {
    var mockedString = "";
    for (var index = 0; index < newString.length; index++) {
        if (index % 2 == 0) {
            mockedString += newString[index].toUpperCase();
        } else {
            mockedString += newString[index].toLowerCase();
        }
    }
    return mockedString;
}

const util = {
    mock: mock
}

module.exports = Object.freeze(util);