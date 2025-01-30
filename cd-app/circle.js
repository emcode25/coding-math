var Circle = {
    x: 0,
    y: 0,
    radius: 0,

    create: function(x, y, radius) {
        var obj = Object.create(this);
        obj.x = x;
        obj.y = y;
        obj.radius = radius;
        return obj;
    }
}