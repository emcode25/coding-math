window.onload = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    var centerX = width * 0.5;
    var centerY = height * 0.5;
    var radius = 200;
    var angle = 0;
    var numObjects = 10;
    var slice = Math.PI * 2 / numObjects
    var x, y;

    for(var i = 0; i < numObjects; ++i)
    {
        angle = i * slice;

        x = centerX + Math.cos(angle) * radius;
        y = centerY + Math.sin(angle) * radius;
        
        context.beginPath();
        context.arc(x, y, 10, 0, Math.PI * 2, false);
        context.fill();
    }
};