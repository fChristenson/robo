'use strict';

var Grid = require('../classes/grid');
var Robot = require('../classes/robot');
var assert = require('assert');

describe('Robo integration tests', function() {

  var grid;
  var robot;
  var moves;

  /*
     The robot is on a 100×100 grid at location (0, 0) and facing SOUTH.
     The robot is given the commands “fflff” and should end up at (2, 2)
  */

  it('should stop at (2,2)', function(done) {

    grid = new Grid(100, 100);
    robot = new Robot();
    assert.equal(robot.xPos, 0);
    assert.equal(robot.yPos, 0);
    assert.equal(robot.directions[robot.facing], 'south');
    moves = ['f', 'f', 'l', 'f', 'f'];

    try {

      console.log('Robot starting at (%s, %s) facing %s', robot.xPos, robot.yPos, robot.directions[robot.facing]);
      moves.forEach(function(move) {

        robot.turn(move, grid);
        robot.move(move, grid);

      });

    } catch(err) {

      assert.fail(err);

    }

    assert.equal(robot.xPos, 2);
    assert.equal(robot.yPos, 2);
    done();

  });

  /*
    The robot is on a 50×50 grid at location (1, 1) and facing NORTH.
    The robot is given the commands “fflff” and should end up at (1, 0)
  */

  it('should stop at (1,0)', function(done) {

    grid = new Grid(50, 50);
    robot = new Robot(1, 1, 0);
    assert.equal(robot.xPos, 1);
    assert.equal(robot.yPos, 1);
    assert.equal(robot.directions[robot.facing], 'north');
    moves = ['f', 'f', 'l', 'f', 'f'];

    try {

      console.log('Robot starting at (%s, %s) facing %s', robot.xPos, robot.yPos, robot.directions[robot.facing]);
      moves.forEach(function(move) {

        robot.turn(move, grid);
        robot.move(move, grid);

      });

    } catch(err) {

      assert.equal(err.message, 'You hit a wall');
      assert.equal(robot.xPos, 1);
      assert.equal(robot.yPos, 0);
      done();

    }

  });

  /*
    The robot is on a 100×100 grid at location (50, 50) and facing NORTH.
    The robot is given the commands “fflffrbb” but there is an obstacle
    at (48, 50) and should end up at (48, 49)
  */

  it('should stop for obstacle', function(done) {

    grid = new Grid(100, 100, [[48, 50]]);
    assert.equal(grid.grid[48][50], 1);

    robot = new Robot(50, 50, 0);
    assert.equal(robot.xPos, 50);
    assert.equal(robot.yPos, 50);
    assert.equal(robot.directions[robot.facing], 'north');
    moves = ['f', 'f', 'l', 'f', 'f', 'r', 'b', 'b'];

    try {

      console.log('Robot starting at (%s, %s) facing %s', robot.xPos, robot.yPos, robot.directions[robot.facing]);
      moves.forEach(function(move) {

        robot.turn(move, grid);
        robot.move(move, grid);

      });

    } catch(err) {

      assert.equal(err.message, 'You hit an obstacle');
      assert.equal(robot.xPos, 48);
      assert.equal(robot.yPos, 49);
      done();

    }

  });

});
