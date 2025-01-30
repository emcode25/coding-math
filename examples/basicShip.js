window.onload = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    var ship = Particle.create(width / 2, height / 2, 0, 0);
    var thrust = Vector.create(0, 0);
    var angle = 0;

    var turningLeft = false;
    var turningRight = false;
    var thrusting = false;

    update();

    document.body.addEventListener("keydown", function(event) {
        //console.log(event.key);

        switch(event.key) {
            case "ArrowUp":
                thrusting = true;
                break;
            case "ArrowLeft":
                turningLeft = true;
                break;
            case "ArrowRight":
                turningRight = true;
                break;
            default:
                break;
        }
    });

    document.body.addEventListener("keyup", function(event) {
        //console.log(event.key);

        switch(event.key) {
            case "ArrowUp":
                thrusting = false;
                break;
            case "ArrowLeft":
                turningLeft = false;
                break;
            case "ArrowRight":
                turningRight = false;
                break;
            default:
                break;
        }
    });

    function update() {
        context.clearRect(0, 0, width, height);

        if(turningLeft)
        {
            angle -= 0.05;
        }
        if(turningRight)
        {
            angle += 0.05;
        }

        thrust.setAngle(angle);
        
        if(thrusting)
        {
            thrust.setLength(0.1);
        }
        else
        {
            thrust.setLength(0);
        }

        ship.accelerate(thrust);
        ship.update();

        context.save();
        context.translate(ship.position.getX(), ship.position.getY());
        context.rotate(angle);

        context.beginPath();
        context.moveTo(10, 0);
        context.lineTo(-10, -7);
        context.lineTo(-10, 7);
        context.lineTo(10, 0);

        if(thrusting)
        {
            context.moveTo(-10, 0);
            context.lineTo(-18, 0);
        }

        context.stroke();

        context.restore();

        if(ship.position.getX() > width)
        {
            ship.position.setX(0);
        }
        if(ship.position.getX() < 0)
        {
            ship.position.setX(width);
        }
        if(ship.position.getY() > height)
        {
            ship.position.setY(0);
        }
        if(ship.position.getY() < 0)
        {
            ship.position.setY(height);
        }

        requestAnimationFrame(update);
    }
};