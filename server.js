var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var StateResponse = require('./classes/stateResponse');
var ApiInterface = require('./classes/apiInterface');
var Grid = require('./classes/grid');
var Robot = require('./classes/robot');

var grid;
var robot;

app.use(bodyParser.json());

app.get('/', function (req, res) {

  res.json(new ApiInterface());

});

app.post('/start', function (req, res) {

  var gridData = req.body.grid || {};
  var robotData = req.body.robot || {};

  grid = new Grid(gridData.width, gridData.height, gridData.obstacles);
  robot = new Robot(robotData.xPos, robotData.yPos, robotData.facing);
  res.json(new StateResponse(grid, robot));

});

app.post('/move', function (req, res) {

  if (!grid) {

    grid =  new Grid();

  }

  if (!robot) {

    robot = new Robot();

  }

  if(req.body.moves) {

    var moves = req.body.moves;

    for (var i = 0; i < moves.length; i++) {

      robot.turn(moves[i]);
      robot.move(moves[i], grid);

    }

  }

  res.json(robot);

});

app.get('/robot', function (req, res) {

  res.json(robot || {});

});

app.use(function (req, res, next) {

  res.status(404);
  res.end('404');

});

app.use(function (err, req, res, next) {

  res.status(500);
  res.end(err.message);

});

app.listen(3000, function() {

  console.log('Runnig on port 3000');

});
