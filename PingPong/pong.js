// Constants
const GAME_WIDTH = 600;
const GAME_HEIGHT = 400;
const KEY_UP = 38;
const KEY_DOWN = 40;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 50;
const BACKGROUND_COLOUR = "#000000";
const PLAYER_COLOUR = "#FFFFFF";
const COMPUTER_COLOUR = "#FF0000"
const BALL_COLOUR = "#FFFFFF";

// Get the middle y-value to draw the paddle using the relationship between
// the height of the canvas and the height of the paddle
const MIDDLE_Y = (GAME_HEIGHT-PADDLE_HEIGHT)/2

/* Entities in the game */
var player = new Player();
var computer = new Computer();
var ball = new Ball(GAME_WIDTH/2, GAME_HEIGHT/2);

/* PADDLE */
function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}

Paddle.prototype.render = function(colour) {
  context.fillStyle = colour;
  context.fillRect(this.x, this.y, this.width, this.height);
}

Paddle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  if (this.y < 0) {
    // all the way to the bottom
    this.y = 0;
    this.y_speed = 0;
  } else if (this.y + this.height > GAME_HEIGHT) {
    // all the way to the top
    this.y = GAME_HEIGHT - this.height;
    this.y_speed = 0;
  }
}

/* BALL */
function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 3;
  this.y_speed = 0;
  this.radius = 5;
}

Ball.prototype.render = function(colour) {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = colour;
  context.fill();
}

Ball.prototype.update = function(paddle1, paddle2) {
  this.x += this.x_speed;
  this.y += this.y_speed;

  var top_x = this.x - 5;
  var top_y = this.y - 5;

  var bottom_x = this.x + 5;
  var bottom_y = this.y + 5;

  if (this.y - 5 < 0) { // hitting the top wall
    this.y = 5;
    this.y_speed = -this.y_speed;
  } else if (this.y + 5 > GAME_HEIGHT) { // hitting the bottom wall
    this.y = GAME_HEIGHT-5;
    this.y_speed = -this.y_speed;
  }

  // A point was score, reset the ball
  if (this.x < 0 || this.x > GAME_WIDTH) {
    this.x_speed = 3;
    this.y_speed = 0;
    this.x = GAME_WIDTH/2;
    this.y = GAME_HEIGHT/2;
    paddle1.y = MIDDLE_Y;
    paddle2.y = MIDDLE_Y;
  }

  if (top_x < 300) {
    if (top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y
      && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
      // hit the player's paddle
      this.x_speed = 3;
      this.y_speed += (paddle1.y_speed / 2);
      this.x += this.x_speed;
    }
  } else {
    if (top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y
      && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
      // hit the computer's paddle
      this.x_speed = -3;
      this.y_speed += (paddle2.y_speed / 2);
      this.x += this.x_speed;
    }
  }
};

/* PLAYER */
function Player() {
  this.paddle = new Paddle(10, MIDDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT);
}

Player.prototype.update = function() {
  for (var key in keysDown) {
    var value = Number(key);

    if (value == KEY_UP) {
      this.paddle.move(0, -4);
    } else if (value == KEY_DOWN) {
      this.paddle.move(0, 4);
    } else {
      this.paddle.move(0, 0);
    }
  }
}

Player.prototype.render = function(colour) {
  this.paddle.render(colour);
}

/* COMPUTER */
function Computer() {
  this.paddle = new Paddle(GAME_WIDTH-20, MIDDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT);
}

Computer.prototype.update = function(ball) {
  var y_pos = ball.y;
  var diff = -( (this.paddle.y + (this.paddle.height / 2) ) - y_pos);
  if (diff < 0  &&  diff < -4) { // max speed left
    diff = -4;
  } else if (diff > 0 && diff > 4) { // max speed right
    diff = 4;
  }

  this.paddle.move(0, diff);

  if (this.paddle.y < 0) {
    this.paddle.y = 0;
  } else if (this.paddle.y + this.paddle.height > 400) {
    this.paddle.y = 400 - this.paddle.height;
  }
}

Computer.prototype.render = function(colour) {
  this.paddle.render(colour);
}

// Tell the browser we wish to perform animation
var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };

// Set up a 2D canvas
var canvas = document.createElement('canvas');
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
// canvas.style.paddingLeft('50px');
var context = canvas.getContext('2d');

// document.body.style.backgroundColor('red');

// When the page loads, attach the canvas to the screen
window.onload = function() {
  document.body.appendChild(canvas);
  animate(step);
};

var step = function() {
  update();       // Update all our objects
  render();       // Render those objects
  animate(step);  // Use requestAnimationFrame to call step()
};

var update = function() {
  player.update();
  computer.update(ball);
  ball.update(player.paddle, computer.paddle);
};

var render = function() {
  context.fillStyle = BACKGROUND_COLOUR;
  context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  player.render(PLAYER_COLOUR);
  computer.render(COMPUTER_COLOUR);
  ball.render(BALL_COLOUR);
}

/* CONTROLS */
var keysDown = {}; // Keep track of which key is pressed

window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
})