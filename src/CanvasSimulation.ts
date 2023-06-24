import Boundary from './Boundary';

interface CanvasSimulationProps {
  containerId: string;
  width?: number;
  height?: number;
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
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
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

export default CanvasSimulation;
