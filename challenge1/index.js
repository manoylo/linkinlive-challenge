"use strict";

var Area = require('./Area.js');
var Rectangle = require('./Rectangle.js');


// initializing input stream
var stdin = process.openStdin();
var inputLines = [];

console.log("Type in the input data, line-by-line. Enter an empty line to finish.");

// reading the data by lines
stdin.addListener("data", function (data) {
    var inputString = data.toString().trim();
    if (inputString) {
        // adding line to buffer
        inputLines.push(inputString);
    } else {
        // empty line entered -> start calculations
        if (inputLines.length > 0) {

            // parsing shape sizes
            var shapesSizes = inputLines[0];
            var matches = shapesSizes.match(/([0-9]+) ([0-9]+),([0-9]+) ([0-9]+)/);
            if (matches) {

                // creating shapes
                var area = Area.getInstance(parseInt(matches[1]), parseInt(matches[2]));
                var rectangle = Rectangle.getInstance(parseInt(matches[3]), parseInt(matches[4]), area);

                // parsing points
                for (var i = 1; i < inputLines.length; i++) {
                    var pointMatch = inputLines[i].match(/([0-9]+) ([0-9]+)/);
                    if (pointMatch) {
                        // adding point ot hte area
                        area.addPoint(parseInt(pointMatch[1]), parseInt(pointMatch[2]));
                    }
                }

                // collecting all valid positions along with point numbers
                var rectanglePositions = getValidPositions(area, rectangle);

                // picking one with the max points
                var maxPointsPosition = getMaxPointsPosition(rectanglePositions);

                // printing the result
                console.log("The result is:");
                console.log(shapesSizes);
                console.log(maxPointsPosition.x + ' ' + maxPointsPosition.y + ',' + maxPointsPosition.pointsNumber);

            } else {
                throw new Error('Empty data');
            }
        } else {
            throw new Error('Empty data');
        }
    }
});


/**
 * Collecting all valid rectangle positions in the area
 * @param {Area} area
 * @param {Rectangle} rectangle
 * @returns {Array}
 */
function getValidPositions(area, rectangle) {
    var rectanglePositions = [];

    // moving across all points in the area
    for (var i = 0; i < area.sizeX; i++) {
        for (var j = 0; j < area.sizeY; j++) {
            if (rectangle.isValidPosition(i, j)) {

                // rectangle is in valid position - remembering it
                rectanglePositions.push({
                    x: i,
                    y: j,
                    pointsNumber: rectangle.getContainingPointsNumber(i, j)
                });
            }
        }
    }
    return rectanglePositions;
}


/**
 * Picking position with max pointsNumber from the positions array
 * @param {Array} rectanglePositions
 * @returns {{x: number, y: number, pointsNumber: number}}
 */
function getMaxPointsPosition(rectanglePositions) {
    var maxPointsPosition = {
        x: 0,
        y: 0,
        pointsNumber: 0
    };
    rectanglePositions.forEach(function (position) {
        if (position.pointsNumber > maxPointsPosition.pointsNumber) {
            maxPointsPosition = position;
        }
    });
    return maxPointsPosition;
}