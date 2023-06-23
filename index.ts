interface CanvasSimulationProps {
  containerId: string;
  width?: number;
  height?: number;
}

class CanvasSimulation {
  private root: HTMLElement | null;
  private canvas: HTMLCanvasElement;
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

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}

// Usage
const simulation = new CanvasSimulation({ containerId: 'root' });
const particle = new Particle(simulation.ctx!, 100, 100, 10, 'blue');
particle.draw();
