window.onload = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    var springPoint = Vector.create(width / 2, height / 2);
    var weight = Particle.create(Math.random() * width, Math.random() * height, 0, 0);
    var k = 0.8;

    weight.radius = 20;
    weight.friction = 0.45;

    update();

    document.body.addEventListener("keydown", function(event) {
        //console.log(event.key);
    });

    document.body.addEventListener("keyup", function(event) {
        //console.log(event.key);
    });

    document.body.addEventListener("mousemove", function(event) {
        springPoint.setX(event.clientX);
        springPoint.setY(event.clientY);
    });

    function update() {
        context.clearRect(0, 0, width, height);

        var distance = springPoint.subtract(weight.position);
        var springForce = distance.multiply(k);

        weight.velocity.addTo(springForce);
        weight.update();

        context.beginPath();
        context.arc(weight.position.getX(), weight.position.getY(), weight.radius, 0, Math.PI * 2, false);
        context.fill();

        context.beginPath();
        context.arc(springPoint.getX(), springPoint.getY(), 4, 0, Math.PI * 2, false);
        context.fill();

        context.beginPath();
        context.moveTo(weight.position.getX(), weight.position.getY());
        context.lineTo(springPoint.getX(), springPoint.getY());
        context.stroke();

        requestAnimationFrame(update);
    }
};