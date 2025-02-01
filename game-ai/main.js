var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
var screenWidth, screenHeight;

var p;

window.onload = function() {
    document.body.appendChild(canvas);
    screenWidth = canvas.width = window.innerWidth;
    screenHeight = canvas.height = window.innerHeight;

    p = Agent.create(screenWidth / 2, screenHeight / 2, 0, 0);

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
    });
};

var prevTime = Date.now();
gameLoop();

function gameLoop() {
    requestAnimationFrame(gameLoop);

    var currTime = Date.now();
    var deltaTime = (currTime - prevTime) / 1000;
    prevTime = currTime;

    context.clearRect(0, 0, screenWidth, screenHeight);

    p.render(context);
}