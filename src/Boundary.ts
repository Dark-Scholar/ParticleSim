import Particle from './Particle';

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
      particle.velocityX = -velocityX + (Math.random() * 0.2 - 0.1); // Add random component to X velocity change
    }

    // Resolve collision with top or bottom border
    if (y + radius > this.y + this.height || y - radius < this.y) {
      particle.velocityY = -velocityY + (Math.random() * 0.2 - 0.1); // Add random component to Y velocity change
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

export default Boundary;
