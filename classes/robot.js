'use strict';

var NORTH = 'north';
var EAST = 'east';
var SOUTH = 'south';
var WEST = 'west';

var turn = function(direction) {

  if (direction && direction.toLowerCase() === 'r') {
    // Using modulus we can simply loop over the numbers 0,1,2,3
    this.facing = (this.facing + 1) % this.directions.length;
    console.log('Robot turned right to %s', this.directions[this.facing]);

  } else if (direction && direction.toLowerCase() === 'l') {
    /*
     By adding 3 we will move our facing pointer to the left.
     WARNING: With this solution we are simply incrementing a number and there is a limit
     to how many times we can do this before we reach the Number.MAX_SAFE_INTEGER cap
    */
    this.facing = (this.facing + 3) % this.directions.length;
    console.log('Robot turned left to %s', this.directions[this.facing]);

  }

};

var wallError = new Error('You hit a wall');
var objstacleError = new Error('You hit an obstacle');

var validateMove = function(xPos, yPos, gridObj) {

  // make sure the move is not outside
  if (xPos < 0 || yPos < 0) {

    throw wallError;
    // as this is a grid we only check the first y-axis array's length
  } else if (xPos > gridObj.grid.length || yPos > gridObj.grid[0].length) {

    throw wallError;
    // the grid array's are filled with 0's and a 1 represents an obstacle
  } else if(gridObj.grid[xPos][yPos] === 1) {

    throw objstacleError;

  }

};

var moveForward = function(grid) {

  if (this.directions[this.facing] === NORTH) {

    // move one tile up
    validateMove(this.xPos, this.yPos - 1, grid);
    this.yPos = this.yPos - 1;

  } else if (this.directions[this.facing] === EAST) {

    // move one tile right
    validateMove(this.xPos + 1, this.yPos, grid);
    this.xPos = this.xPos + 1;

  } else if (this.directions[this.facing] === SOUTH) {

    // move one tile down
    validateMove(this.xPos, this.yPos + 1, grid);
    this.yPos = this.yPos + 1;

  } else if (this.directions[this.facing] === WEST) {

    // move one tile left
    validateMove(this.xPos - 1, this.yPos, grid);
    this.xPos = this.xPos - 1;

  }

};

var moveBackward = function(grid) {

  if (this.directions[this.facing] === NORTH) {

    // move one tile down
    validateMove(this.xPos, this.yPos + 1, grid);
    this.yPos = this.yPos + 1;

  } else if (this.directions[this.facing] === EAST) {

    // move one tile left
    validateMove(this.xPos - 1, this.yPos, grid);
    this.xPos = this.xPos - 1;

  } else if (this.directions[this.facing] === SOUTH) {

    // move one tile up
    validateMove(this.xPos, this.yPos - 1, grid);
    this.yPos = this.yPos - 1;

  } else if (this.directions[this.facing] === WEST) {

    // move one tile right
    validateMove(this.xPos + 1, this.yPos, grid);
    this.xPos = this.xPos + 1;

  }

};

var move = function(direction, grid) {
  // assuming a grid where 0,0 is at the top left corner
  if (direction && direction.toLowerCase() === 'f') {

    moveForward.call(this, grid);
    console.log('Robot moved forward to (%s, %s)', this.xPos, this.yPos);

  } else if (direction && direction.toLowerCase() === 'b') {

    moveBackward.call(this, grid);
    console.log('Robot moved backward to (%s, %s)', this.xPos, this.yPos);

  }

};

module.exports = function(x, y, facing) {

  facing = parseInt(facing); // error check facing to be a number

  if (isNaN(facing) || facing < 0 || facing > 3) { // has to be in range of directions array

    facing = 2; // index of SOUTH in our directions array

  }

  return {

    xPos: x || 0,
    yPos: y || 0,
    directions: [NORTH, EAST, SOUTH, WEST],
    facing: facing,
    turn: turn,
    move: move

  };

};
