'use strict';

module.exports = function() {

  return {

    name: 'Robo api',
    description: 'Api to move a robot around a grid',
    links: {

      start: {

        href: 'http://localhost:3000/start',
        description: 'A post to this endpoint starts a new grid',
        notes:[

        'To set a start state please use the provided templates.',
        'The robot facing property is a number betwen 0 - 3 where 0 = north, 1 = east, 2 = south and 3 = west',
        'Not providing any templates to this endpoint will create a default robot and grid'

        ] ,
        templates: {

          robot: {

            xPos: 0,
            yPos: 0,
            facing: 0

          },
          grid: {

            width: 10,
            height: 10,
            obstacles: [[5, 5]]

          }

        }

      },
      move: {

        href: 'http://localhost:3000/move',
        description: 'Posting an array of commands to this endpoint will move the robot',
        notes: [

        'The expected format of the array is [f,b,r,l]',
        'Using this route without first using /start will create a default robot and grid'

        ]

      },
      robot: {

        href: 'http://localhost:3000/robot',
        description: 'A GET to this endpoint returns the current state of the robot'

      }

    }

  };

};
