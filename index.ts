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
  velocityX: number;
  velocityY: number;
}

class CanvasSimulation {
  private root: HTMLElement | null;
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D | null;

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
  private x: number;
  private y: number;
  private radius: number;
  private color: string;
  private velocityX: number;
  private velocityY: number;

  constructor({
    ctx,
    x,
    y,
    radius,
    color,
    velocityX,
    velocityY,
  }) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
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
    this.x += this.velocityX;
    this.y += this.velocityY;
  }
}

// Usage
const simulation = new CanvasSimulation({ containerId: 'root' });
const particle = new Particle({
  ctx: simulation.ctx!,
  x: 100,
  y: 100,
  radius: 10,
  color: 'blue',
  velocityX: 2,
  velocityY: 1,
});
particle.draw();


const animate = () => {
  // Clear Canvase
  simulation.ctx?.clearRect(0, 0, simulation.canvas.width, simulation.canvas.height);

  // Draw and update particle
  particle.draw();
  particle.update();

  // Update the animation
  requestAnimationFrame(animate);
};

// animate();