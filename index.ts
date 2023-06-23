interface CanvasSimulationProps {
  containerId: string;
  width?: number;
  height?: number;
}

interface ParticleProps {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  color: string;
  speed: number;
  velocityX: number;
  velocityY: number;
}

class Boundary {
  private x: number;
  private y: number;
  private width: number;
  private height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  isCollidingWith(particle: Particle): boolean {
    const { x, y, radius } = particle;
    return (
      x + radius > this.x + this.width ||
      x - radius < this.x ||
      y + radius > this.y + this.height ||
      y - radius < this.y
    );
  }

  resolveCollision(particle: Particle) {
    const { x, y, radius, velocityX, velocityY } = particle;

    // Resolve collision with left or right border
    if (x + radius > this.x + this.width || x - radius < this.x) {
      particle.velocityX = -velocityX; // Reverse the X velocity
    }

    // Resolve collision with top or bottom border
    if (y + radius > this.y + this.height || y - radius < this.y) {
      particle.velocityY = -velocityY; // Reverse the Y velocity
    }
  }
}

class CanvasSimulation {
  private root: HTMLElement | null;
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D | null;
  public boundary: Boundary;

  constructor({
    containerId,
    width,
    height,
  }: CanvasSimulationProps) {
    this.root = document.querySelector(`#${containerId}`);
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    if (width && height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
  }

  initialize() {
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
  }

  clearCanvas() {
    simulation.ctx?.clearRect(0, 0, simulation.canvas.width, simulation.canvas.height);
  }

  private resizeCanvas() {
    if (this.root && this.ctx) {
      this.canvas.width = this.root.offsetWidth;
      this.canvas.height = this.root.offsetHeight;
    }
  }

  drawLine(x1: number, y1: number, x2: number, y2: number) {
    if (this.ctx) {
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
  }
}

class Particle {
  private ctx: CanvasRenderingContext2D;
  public x: number;
  public y: number;
  public radius: number;
  private color: string;
  public velocityX: number;
  public velocityY: number;
  private speed: number;

  constructor({
    ctx,
    x,
    y,
    radius,
    color,
    speed,
    velocityX,
    velocityY,
  }: ParticleProps) {
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

// Usage
const simulation = new CanvasSimulation({ containerId: 'root' });
simulation.initialize();

const particle = new Particle({
  ctx: simulation.ctx!,
  x: 100,
  y: 100,
  radius: 10,
  color: 'blue',
  speed: 2,
  velocityX: 2,
  velocityY: 1,
});
particle.draw();


const animate = () => {
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