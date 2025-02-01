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
    mass: 0.1,
    maxSpeed: 300,
    maxForce: 100000,
    maxTurnRate: 0,

    create: function(x, y, speed, direction) {
        var obj = Object.create(this);
        obj.position = Vector.create(x, y);
        obj.velocity = Vector.create(0, 0);
        obj.velocity.setLength(speed);
        obj.velocity.setAngle(direction);
        obj.acceleration = Vector.create(0, 0);
        return obj;
    },

    render: function(context) {
        context.save();
        context.translate(this.position.getX(), this.position.getY());
        context.rotate(this.velocity.getAngle());

        context.beginPath();
        context.moveTo(15, 0);
        context.lineTo(-15, -10);
        context.lineTo(-15, 10);
        context.lineTo(15, 0);

        context.fill();

        context.restore();
    },

    seek: function(targetPos) {
        var desiredVelocity = targetPos.subtract(this.position)
                                .normalized().multiply(this.maxSpeed);
        return desiredVelocity.subtract(this.velocity);
    },

    update(deltaTime, targetPos) {
        var steeringForce = this.seek(targetPos);
        steeringForce.truncate(this.maxForce);
        this.acceleration = steeringForce.divide(this.mass);
        this.velocity.addTo(this.acceleration.multiply(deltaTime));

        if(this.velocity.getLength() > 0.000001)
        {
            this.side = this.velocity.normalized().perp();
        }

        this.position.addTo(this.velocity.multiply(deltaTime));
    }
}