var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
var screenWidth = canvas.width = window.innerWidth;
var screenHeight = canvas.height = window.innerHeight;

var mousePos = Vector.create(0, 0);
var p1, p2;

window.onload = function() {
    document.body.appendChild(canvas);
    p1 = Agent.create(screenWidth * Math.random(), screenHeight * Math.random(), 0, 0);
    p1.radius = 20;

    p2 = Agent.create(screenWidth * Math.random(), screenHeight * Math.random(), 0, 0);
    p2.radius = 20;

    document.body.addEventListener("keydown", function(event) {
        //console.log(event.key);

        
    });

    document.body.addEventListener("keyup", function(event) {
        //console.log(event.key);

        switch(event.key)
        {
            case "ArrowUp":
                break;
            case "ArrowDown":
                break;
            case "ArrowLeft":
                break;
            case "ArrowRight":
                break;
            default:
                break;
        }
    });

    document.body.addEventListener("mousemove", function(event) {
        //console.log(event.clientX);
        //console.log(event.clientY);

        mousePos.setX(event.clientX);
        mousePos.setY(event.clientY);
    });

    gameLoop();
};

var prevTime = Date.now();

function gameLoop() {
    requestAnimationFrame(gameLoop);

    var currTime = Date.now();
    var deltaTime = (currTime - prevTime) / 1000;
    prevTime = currTime;

    context.clearRect(0, 0, screenWidth, screenHeight);

    p1.update(deltaTime, mousePos);
    p2.update(deltaTime, p1.position);

    context.fillStyle = "#000000";
    p1.render(context);
    context.fillStyle = "#ff0000"
    p2.render(context);
}