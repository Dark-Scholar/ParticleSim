var Boundary = /** @class */ (function () {
    function Boundary(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Boundary.prototype.isCollidingWith = function (particle) {
        var x = particle.x, y = particle.y, radius = particle.radius;
        return (x + radius > this.x + this.width ||
            x - radius < this.x ||
            y + radius > this.y + this.height ||
            y - radius < this.y);
    };
    Boundary.prototype.resolveCollision = function (particle) {
        var x = particle.x, y = particle.y, radius = particle.radius, velocityX = particle.velocityX, velocityY = particle.velocityY;
        // Resolve collision with left or right border
        if (x + radius > this.x + this.width || x - radius < this.x) {
            particle.velocityX = -velocityX + Math.random() * 0.2 - 0.1; // Add random component to X velocity change
        }
        // Resolve collision with top or bottom border
        if (y + radius > this.y + this.height || y - radius < this.y) {
            particle.velocityY = -velocityY + Math.random() * 0.2 - 0.1; // Add random component to Y velocity change
        }
    };
    Boundary.prototype.resolveCollisions = function (particles) {
        for (var _i = 0, particles_1 = particles; _i < particles_1.length; _i++) {
            var particle = particles_1[_i];
            if (this.isCollidingWith(particle)) {
                this.resolveCollision(particle);
            }
        }
    };
    return Boundary;
}());
var CanvasSimulation = /** @class */ (function () {
    function CanvasSimulation(_a) {
        var containerId = _a.containerId, width = _a.width, height = _a.height;
        this.MAX_PARTICLES = 1000;
        this.MIN_PARTICLES = 1;
        this.MAX_ITER = 1000000;
        this.root = document.querySelector("#".concat(containerId));
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        if (width && height) {
            this.canvas.width = width;
            this.canvas.height = height;
        }
    }
    CanvasSimulation.prototype.initialize = function () {
        if (this.root) {
            this.root.style.backgroundColor = 'white';
            this.root.style.borderRadius = '2%';
            this.root.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
            this.root.style.border = '1px solid black';
            this.root.style.position = 'relative';
            this.root.style.width = '100%';
            this.root.style.height = '90vh';
            this.root.appendChild(this.canvas);
            window.addEventListener('resize', this.resizeCanvas.bind(this));
            this.resizeCanvas();
        }
        this.boundary = new Boundary(0, 0, this.canvas.width, this.canvas.height);
    };
    CanvasSimulation.prototype.clearCanvas = function () {
        var _a;
        (_a = simulation.ctx) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, simulation.canvas.width, simulation.canvas.height);
    };
    CanvasSimulation.prototype.resizeCanvas = function () {
        if (this.root && this.ctx) {
            this.canvas.width = this.root.offsetWidth;
            this.canvas.height = this.root.offsetHeight;
        }
    };
    CanvasSimulation.prototype.drawLine = function (x1, y1, x2, y2) {
        if (this.ctx) {
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        }
    };
    return CanvasSimulation;
}());
var Particle = /** @class */ (function () {
    function Particle(_a) {
        var ctx = _a.ctx, x = _a.x, y = _a.y, radius = _a.radius, color = _a.color, speed = _a.speed, velocityX = _a.velocityX, velocityY = _a.velocityY;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.speed = speed;
    }
    Particle.prototype.draw = function () {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        // Add shadow for 3D effect
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        this.ctx.shadowBlur = 0.6;
        this.ctx.shadowOffsetX = 3;
        this.ctx.shadowOffsetY = 3;
        this.ctx.fill();
        this.ctx.closePath();
    };
    Particle.prototype.update = function () {
        // Update particle position based on velocity
        this.x += this.velocityX * this.speed;
        this.y += this.velocityY * this.speed;
    };
    return Particle;
}());
// Utility Functions
var random_hex_color_code = function () {
    var n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
};
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// Usage
var simulation = new CanvasSimulation({ containerId: 'root' });
simulation.initialize();
var particles = [];
var numParticles = randomIntFromInterval(simulation.MIN_PARTICLES, simulation.MAX_PARTICLES);
var i = 0;
while (i <= numParticles && i < simulation.MAX_ITER) {
    particles.push(new Particle({
        ctx: simulation.ctx,
        x: 100,
        y: 100,
        radius: 10,
        color: random_hex_color_code(),
        speed: 2,
        velocityX: 2,
        velocityY: 1,
    }));
    i++;
}
var animate = function () {
    simulation.clearCanvas();
    for (var _i = 0, particles_2 = particles; _i < particles_2.length; _i++) {
        var particle = particles_2[_i];
        // Draw and update particle
        particle.draw();
        particle.update();
    }
    simulation.boundary.resolveCollisions(particles);
    // Update the animation
    requestAnimationFrame(animate);
};
animate();
