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
    function Particle(ctx, x, y, radius, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    Particle.prototype.draw = function () {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    };
    return Particle;
}());
// Usage
var simulation = new CanvasSimulation({ containerId: 'root' });
var particle = new Particle(simulation.ctx, 100, 100, 10, 'blue');
particle.draw();
