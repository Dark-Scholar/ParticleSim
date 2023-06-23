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
        if (this.root) {
            this.root.appendChild(this.canvas);
        }
    }
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
        var ctx = _a.ctx, x = _a.x, y = _a.y, radius = _a.radius, color = _a.color, velocityX = _a.velocityX, velocityY = _a.velocityY;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
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
        this.x += this.velocityX;
        this.y += this.velocityY;
    };
    return Particle;
}());
// Usage
var simulation = new CanvasSimulation({ containerId: 'root' });
var particle = new Particle({
    ctx: simulation.ctx,
    x: 100,
    y: 100,
    radius: 10,
    color: 'blue',
    velocityX: 2,
    velocityY: 1,
});
particle.draw();
var animate = function () {
    var _a;
    // Clear Canvase
    (_a = simulation.ctx) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, simulation.canvas.width, simulation.canvas.height);
    // Draw and update particle
    particle.draw();
    particle.update();
    // Update the animation
    requestAnimationFrame(animate);
};
// animate();
