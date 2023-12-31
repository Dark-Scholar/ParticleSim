interface ParticleProps {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  color: string;
  speed: number;
  velocityX: number;
  velocityY: number;
  velocityXMutator?: number;
  velocityYMutator?: number;
  mass?: number;
}

class Particle {
  private ctx: CanvasRenderingContext2D;
  public x: number;
  public y: number;
  public radius: number;
  private color: string;
  public velocityX: number;
  public velocityY: number;
  public speed: number;
  private velocityXMutator: number;
  private velocityYMutator: number;
  private mass: number;

  constructor({
    ctx,
    x,
    y,
    radius,
    color,
    speed,
    velocityX,
    velocityY,
    velocityXMutator = 1,
    velocityYMutator = 1,
    mass = 1
  }: ParticleProps) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.speed = speed;
    this.velocityXMutator = velocityXMutator;
    this.velocityYMutator = velocityYMutator;
    this.mass = mass;
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
    this.x += this.velocityX * this.speed * Math.PI / this.velocityXMutator;
    this.y += this.velocityY * this.speed * Math.PI / this.velocityYMutator;
  }
}

export default Particle;