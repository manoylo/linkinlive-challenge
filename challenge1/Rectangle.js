"use strict";

var rectangle = null;

/**
 *
 * @param sizeX
 * @param sizeY
 * @param area
 * @constructor
 */
function Rectangle(sizeX, sizeY, area) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.area = area;

    /**
     * Checking if position is valid with the given area
     * @param positionX
     * @param positionY
     * @returns {boolean}
     */
    this.isValidPosition = function (positionX, positionY) {
        return positionX + this.sizeX <= this.area.sizeX && positionY + this.sizeY <= this.area.sizeY;
    };

    /**
     * Calculating points number for a position
     * @param positionX
     * @param positionY
     * @returns {number}
     */
    this.getContainingPointsNumber = function (positionX, positionY) {
        var pointsNumber = 0;
        var self = this;
        this.area.points.forEach(function (point) {
            if (point.x >= positionX && point.x < positionX + self.sizeX && point.y >= positionY && point.y < positionY + self.sizeY) {
                pointsNumber++;
            }
        });
        return pointsNumber;
    };
}

/**
 * Rectangle Singleton function
 * @param sizeX
 * @param sizeY
 * @param area
 * @returns {Rectangle}
 */
module.exports.getInstance = function (sizeX, sizeY, area) {
    if (rectangle) {
        return rectangle;
    } else {
        rectangle = new Rectangle(sizeX, sizeY, area);
        return rectangle;
    }
};