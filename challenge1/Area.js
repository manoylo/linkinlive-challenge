"use strict";

var Point = require('./Point.js');

var area = null;

/**
 * Class representing the Area shape
 * @param sizeX
 * @param sizeY
 * @constructor
 */
function Area(sizeX, sizeY) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.points = [];

    /**
     * Adding point by passed coordinates
     * @param x
     * @param y
     */
    this.addPoint = function (x, y) {
        this.points.push(new Point(x, y));
    };
}


/**
 * Area Singleton function
 * @param sizeX
 * @param sizeY
 * @returns {Area}
 */
module.exports.getInstance = function (sizeX, sizeY) {
    if (area) {
        return area;
    } else {
        area = new Area(sizeX, sizeY);
        return area;
    }
};