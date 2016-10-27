'use strict';

var five = require('johnny-five');
var board = new five.Board();
var keypress = require('keypress');

board.on('ready', function() {
  // Use your shield configuration from the list
  // http://johnny-five.io/api/motor/#pre-packaged-shield-configs
  var configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V1;
  var motors = new five.Motors([
    configs.M4,
    configs.M3
  ]);
  
  var servo = new five.Servo({
    pin: 10,
    center: true
  });

  this.repl.inject({
    motors: motors
  });
    
  this.repl.inject({
    servo: servo
  })

  console.log('Welcome to the Pee Wee Runt Rover!');
  console.log('Control the bot with the arrow keys, and SPACE to stop.');

  function forward() {
    console.log('Going forward');
    motors.fwd(255);
  }

  function backward() {
    console.log('Going backward');
    motors.rev(255);
  }

  function left() {
    console.log('Going left');
    motors[0].rev(200);
    motors[1].fwd(200);
  }
    
  function fastLeft() {
    console.log('Going fast left');
    motors[0].rev(255);
    motors[1].fwd(255);
  }    

  function right() {
    console.log('Going right');
    motors[1].rev(200);
    motors[0].fwd(200);
  }
    
  function fastRight() {
    console.log('Going fast right');
    motors[1].rev(255);
    motors[0].fwd(255);
  }
    
  function swerve() {
    console.log('Servo spin fest');
    servo.sweep();
  }

  function swerveStop() {
    console.log('Servo stop spin');
    servo.stop();
  }

  function stop() {
    motors.stop();
  }
    


  keypress(process.stdin);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', function (ch, key) {

    if ( !key ) { return; }

    if ( key.name === 'q' ) {

      console.log('Quitting');
      stop();
      process.exit();

    } else if ( key.name === 'up' ) {

      forward();

    } else if ( key.name === 'down' ) {

      backward();

    } else if ( key.name === 'left' ) {

      left();

    }
    else if ( key.name === 'n' ) {

      fastLeft();

    }
      else if ( key.name === 'right' ) {

      right();
    }
      
    else if ( key.name === 'm' ) {

      fastRight();

    } 
      
    else if ( key.name === 'z') {
     
      swerve();
        
    }
      
    else if ( key.name === 'x') {
     
      swerveStop();
        
    }else if ( key.name === 'space' ) {

      stop();

    }
  });
});
