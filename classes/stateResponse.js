'use strict';

module.exports = function(grid, robot) {

  return {

    width: grid.width,
    height: grid.height,
    obstacles: grid.obstacles,
    robotXPos: robot.xPos,
    robotYPos: robot.yPos,
    robotFacing: robot.directions[robot.facing]

  };

};
