'use strict';

var validatePosition = function(position, grid) {

  var invalidPosition;

  if (position[0] < 0 || position[1] < 0) {

    invalidPosition = new Error('Negative numbers are not valid position numbers');

  } else if (position[0] > grid.length) {

    invalidPosition = new Error(position[0] + ' is not a valid position for an obstacle');

  } else if (position[1] > grid[0].length) {

    invalidPosition = new Error(position[1] + ' is not a valid position for an obstacle');

  }

};

module.exports = function(width, height, obstacleArray) {

  width = parseInt(width);
  height = parseInt(height);
  // if for some reason width and height are NaN or 0 we default to 10
  width = !width ? 10 : width;
  height = !height ? 10: height;

  var grid = [];

  for(var i = 0; i < width; i++) {

    var tiles = [];

    for(var j = 0; j < height; j++) {

      tiles.push(0);

    }

    grid.push(tiles);

  }

 if(obstacleArray && obstacleArray instanceof Array) {

  /*
    The obstacleArray is assumed to be an two dimensioned array were each subarray has 2 numbers.
    The first number of each subarray is assumed to be x and the next y.
  */

  obstacleArray.forEach(function(position) {

    validatePosition(position, grid);
    var x = position[0];
    var y = position[1];
    grid[x][y] = 1;

  });

 }

  return {

    width: width,
    height: height,
    grid: grid,
    obstacles: obstacleArray || []

  };

};
