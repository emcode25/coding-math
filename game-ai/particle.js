var Particle = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    gravity: null,
    mass: 1,
    radius: 0,
    friction: 1,
    springs: null,
    gravitations: null,

    create: function(x, y, speed, direction, grav) {
        var obj = Object.create(this);
        obj.x = x;
        obj.y = y;
        obj.vx = speed * Math.cos(direction)
        obj.vy = speed * Math.sin(direction);
        obj.gravity = grav || 0;
        obj.springs = [];
        obj.gravitations = [];
        return obj;
    },

    addGravitation: function(p) {
        this.removeGravitation(p);
        this.gravitations.push(p);
    },

    removeGravitation: function(p) {
        for(var i = 0; i < this.gravitations.length; i += 1)
        {
            if(p === this.gravitations[i])
            {
                this.gravitations.splice(i, 1);
                return;
            }
        }
    },

    addSpring: function(point, k, length) {
        this.removeSpring(point);

        this.springs.push({
            point: point,
            k: k,
            length: length || 0
        });
    },

    removeSpring: function(point) {
        for(var i = 0; i < this.springs.length; i += 1)
        {
            if(point === this.springs[i].point) 
            {
                this.springs.splice(i, 1);
                return;
            }
        }
    },

    getSpeed: function() {
        return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    },

    setSpeed: function(speed) {
        var heading = this.getHeading();
        this.vx = speed * Math.cos(heading);
        this.vy = speed * Math.sin(heading);
    },

    getHeading: function() {
        return Math.atan2(this.vy, this.vx);
    },

    setHeading: function(heading) {
        var speed = this.getSpeed();
        this.vx = speed * Math.cos(heading);
        this.vy = speed * Math.sin(heading);
    },

    accelerate: function(ax, ay) {
        this.vx += ax;
        this.vy += ay;
    },

    update: function() {
        this.handleSprings();
        this.handleGravitations();

        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        
        this.x += this.vx;
        this.y += this.vy;
    },

    handleSprings: function() {
        for(var i = 0; i < this.springs.length; i += 1)
        {
            var spring = this.springs[i];
            this.springTo(spring.point, spring.k, spring.length);
        }
    },

    handleGravitations: function() {
        for(var i = 0; i < this.gravitations.length; i += 1)
        {
            this.gravitateTo(this.gravitations[i]);
        }
    },

    angleTo: function(p2) {
        return Math.atan2(p2.y - this.y, p2.x - this.x);
    },

    distanceTo: function(p2) {
        var dx = p2.x - this.x;
        var dy = p2.y - this.y;

        return Math.sqrt(dx * dx + dy * dy);
    },

    gravitateTo: function(p2) {
        var dx = p2.x - this.x;
        var dy = p2.y - this.y;

        var distSQ = dx * dx + dy * dy;
        var dist = Math.sqrt(distSQ);
        var force = p2.mass / distSQ;
        var ax = force * dx / dist;
        var ay = force * dy / dist;

        this.vx += ax;
        this.vy += ay;
    },

    springTo: function(point, k, length) {
        var dx = point.x - this.x;
        var dy = point.y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var springForce = (distance - length || 0) * k;
        this.vx += springForce * dx / distance;
        this.vy += springForce * dy / distance;
    }
};