// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 768;
document.body.appendChild(canvas);

var resetticker = 0;
var resettime = 500;

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "Images/background.png";

/* // Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/bug.png"; */

// Monster image
var bugReady = false;
var bugImage = new Image();
bugImage.onload = function () {
	bugReady = true;
};
bugImage.src = "Images/bug.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var bug = {};
var bugsClicked = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	bug.x = 32 + (Math.random() * (canvas.width - 64));
	bug.y = 32 + (Math.random() * (canvas.height - 64));
};

function reset() {
	bug.x = 32 + (Math.random() * (canvas.width - 64));
	bug.y = 32 + (Math.random() * (canvas.height - 64));
};

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  canvas.addEventListener('click', function(evt) 
  {
    var mousePos = getMousePos(canvas, evt);
    if (
		mousePos.x <= (bug.x + 64)
		&& bug.x <= (mousePos.x + 64)
		&& mousePos.y <= (bug.y + 64)
		&& bug.y <= (mousePos.y + 64)
	) {
        ++bugsClicked;
        resetticker = 0;
        resettime = resettime / 1.05;
		var reset = function () {
            bug.x = 32 + (Math.random() * (canvas.width - 64));
            bug.y = 32 + (Math.random() * (canvas.height - 64));
        };
        reset();
	}
  }, false);

// Update game objects
var update = function (modifier) {

    if (82 in keysDown) { // Player holding R
        bugsClicked = 0;
        resettime = 500;
	}
    resetticker++;
    if (resetticker >= resettime)
    {
        resetticker = 0;
		var reset = function () {
            bug.x = 32 + (Math.random() * (canvas.width - 64));
            bug.y = 32 + (Math.random() * (canvas.height - 64));
        };
        reset();
    }

    
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (bugReady) {
		ctx.drawImage(bugImage, bug.x, bug.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "20px Impact";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
    ctx.fillText("Bugs Smashed: " + bugsClicked, 32, 32);
    ctx.font = "16px Impact";
    ctx.fillText("Press R to reset speed and score", 32, 64);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();