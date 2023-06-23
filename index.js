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
            particle.velocityX = -velocityX; // Reverse the X velocity
        }
        // Resolve collision with top or bottom border
        if (y + radius > this.y + this.height || y - radius < this.y) {
            particle.velocityY = -velocityY; // Reverse the Y velocity
        }
    };
    return Boundary;
}());
var CanvasSimulation = /** @class */ (function () {
    function CanvasSimulation(_a) {
        var containerId = _a.containerId, width = _a.width, height = _a.height;
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
// Usage
var simulation = new CanvasSimulation({ containerId: 'root' });
simulation.initialize();
var particle = new Particle({
    ctx: simulation.ctx,
    x: 100,
    y: 100,
    radius: 10,
    color: 'blue',
    speed: 2,
    velocityX: 2,
    velocityY: 1,
});
particle.draw();
var animate = function () {
    // Clear Canvase
    simulation.clearCanvas();
    // Draw and update particle
    particle.draw();
    particle.update();
    if (simulation.boundary.isCollidingWith(particle)) {
        simulation.boundary.resolveCollision(particle);
    }
    // Update the animation
    requestAnimationFrame(animate);
};
animate();
