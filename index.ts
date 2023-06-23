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
      particle.velocityX = -velocityX + Math.random() * 0.2 - 0.1; // Add random component to X velocity change
    }

    // Resolve collision with top or bottom border
    if (y + radius > this.y + this.height || y - radius < this.y) {
      particle.velocityY = -velocityY + Math.random() * 0.2 - 0.1; // Add random component to Y velocity change
    }
  }

  resolveCollisions(particles: Particle[]) {
    for (const particle of particles) {
      if (this.isCollidingWith(particle)) {
        this.resolveCollision(particle);
      }
    }
  }
}

class CanvasSimulation {
  public MAX_PARTICLES = 1000;
  public MIN_PARTICLES = 1;
  public MAX_ITER = 1000000;

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

// Utility Functions
const random_hex_color_code = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

function randomIntFromInterval(min, max) {
  let rand = Math.floor(Math.random() * (max - min + 1) + min)

  if (rand === 0) {
    rand = randomIntFromInterval(min, max);
  }
  return rand;
}

// Usage
const simulation = new CanvasSimulation({ containerId: 'root' });
simulation.initialize();

const particles: Particle[] = [];

const numParticles = randomIntFromInterval(
  simulation.MIN_PARTICLES,
  simulation.MAX_PARTICLES,
);

let i = 0;
while (i <= numParticles && i < simulation.MAX_ITER) {
  particles.push(new Particle({
    ctx: simulation.ctx!,
    x: randomIntFromInterval(0, simulation.canvas.width),
    y: randomIntFromInterval(0, simulation.canvas.height),
    radius: 10,
    color: random_hex_color_code(),
    speed: 1,
    velocityX: randomIntFromInterval(-2, 2),
    velocityY: randomIntFromInterval(-2, 2),
  }));
  i++;
}

const animate = () => {
  simulation.clearCanvas();

  for (const particle of particles) {
    // Draw and update particle
    particle.draw();
    particle.update();
  }
  simulation.boundary.resolveCollisions(particles);

  // Update the animation
  requestAnimationFrame(animate);
};

animate();