window.onload = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    update();

    document.body.addEventListener("keydown", function(event) {
        //console.log(event.key);
    });

    document.body.addEventListener("keyup", function(event) {
        //console.log(event.key);
    });

    document.body.addEventListener("mousemove", function(event) {
        //console.log(event.clientX);
        //console.log(event.clientY);
    });

    function update() {
        context.clearRect(0, 0, width, height);

        

        requestAnimationFrame(update);
    }
};