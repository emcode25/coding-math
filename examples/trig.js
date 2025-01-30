window.onload = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    var centerX = width * 0.5;
    var centerY = height * 0.5;
    var baseAlpha = 0.5;
    var offset = 0.5;
    var speed = 0.1;
    var angle = 0;

    render();

    function render()
    {
        var alpha = baseAlpha + Math.sin(angle) * offset;
        
        context.fillStyle = "rgba(0, 0, 0, " + alpha, ")";

        context.clearRect(0, 0, width, height);
        context.beginPath();
        context.arc(centerX, centerY, 100, 0, Math.PI * 2, false);
        context.fill();

        angle += speed;

        requestAnimationFrame(render);
    }
};