class Particle {
    ctx;
    x;
    y;
    radius;
    color;
    velocityX;
    velocityY;
    speed;
    constructor({ ctx, x, y, radius, color, speed, velocityX, velocityY, }) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.speed = speed;
    }
    draw() {
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
    }
    update() {
        // Update particle position based on velocity
        this.x += this.velocityX * this.speed;
        this.y += this.velocityY * this.speed;
    }
}
export default Particle;
