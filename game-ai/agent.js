var Agent = {
    world: null,
    id: null,
    position: null,
    velocity: null,
    acceleration: null,
    side: null, //Unit vector perpendicular to velocity
    radius: 0,
    scale: 0,
    bradius: 0,
    tag: false,
    mass: 0,
    maxSpeed: 0,
    maxForce: 0,
    maxTurnRate: 0,

    create: function(x, y, speed, direction) {
        var obj = Object.create(this);
        obj.position = Vector.create(x, y);
        obj.velocity = Vector.create(0, 0);
        obj.velocity.setLength(speed);
        obj.velocity.setAngle(direction);
        return obj;
    },

    render: function(context) {
        context.beginPath();
        context.arc(this.position.getX(), this.position.getY(),
                    this.radius, 0, Math.PI * 2, false);
        context.fill();
    },

    seek: function(targetPos) {
        var desiredVelocity = targetPos.subtract(this.position) * this.maxSpeed;
        return desiredVelocity.subtract(this.velocity);
    },

    update(deltaTime, targetPos) {
        var steeringForce = this.seek(targetPos);
        this.acceleration = steeringForce.divideBy(mass);
        this.velocity += this.acceleration.multiply(deltaTime);

        if(this.velocity.getLength() > 0.000001)
        {
            this.side = this.velocity.normalized().perp();
        }
    }
}