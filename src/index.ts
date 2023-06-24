import CanvasSimulation from './CanvasSimulation';
import random_int_from_interval from './utils/random_int_from_interval';
import random_hex_color_code from './utils/random_hex_color_code';
import Particle from './Particle';
import FormHandler from './FormHandler';
import Form from './enums/Form';
import Particles from './enums/Particles';

const simulation = new CanvasSimulation({ containerId: 'canvas' });
simulation.initialize();

let velocityDivisor = Particles.INITIAL_VELOCITY_DIVISOR;
let speed = Particles.INITIAL_SPEED;
let particles = [];

const formHandler = new FormHandler(Form.SIMCONTROLS_NAME);
const particleInput = document.getElementById(Form.SIMCONTROLS.PARTICLEINPUT) as HTMLInputElement;
const speedInput = document.getElementById(Form.SIMCONTROLS.SPEEDINPUT) as HTMLInputElement;
const massInput = document.getElementById(Form.SIMCONTROLS.MASSINPUT) as HTMLInputElement;

const generateParticles = () => {
  const desiredNumParticles = parseInt(particleInput.value, 10) || Particles.INITIAL_PARTICLE_NUM;

  if (desiredNumParticles > particles.length) {
    generateAdditionalParticles({ particles, desiredNumParticles });
  } else if (desiredNumParticles < particles.length) {
    removeParticles({ particles, desiredNumParticles });
  }
};

const generateAdditionalParticles = ({ particles, desiredNumParticles }) => {
  const numParticlesToAdd = desiredNumParticles - particles.length;
  let i = 0;
  while (i < numParticlesToAdd && i < simulation.MAX_ITER) {
    particles.push(
      new Particle({
        ctx: simulation.ctx!,
        x: random_int_from_interval(0, simulation.canvas.width),
        y: random_int_from_interval(0, simulation.canvas.height),
        radius: 10,
        color: random_hex_color_code(),
        speed: speed,
        velocityX: random_int_from_interval(-2, 2),
        velocityY: random_int_from_interval(-2, 2),
        velocityXMutator: velocityDivisor,
        velocityYMutator: velocityDivisor,
      })
    );
    i++;
  }
};

const removeParticles = ({ particles, desiredNumParticles }) => {
  const numParticlesToRemove = particles.length - desiredNumParticles;
  particles.splice(desiredNumParticles, numParticlesToRemove);
};

particleInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    generateParticles();
  }
});

speedInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    speed = parseFloat(speedInput.value) || Particles.INITIAL_SPEED;
    generateParticles();
  }
});

massInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    speed = parseFloat(massInput.value) || Particles.INITIAL_MASS;
    generateParticles();
  }
});

formHandler.setInputValue(Form.SIMCONTROLS.PARTICLEINPUT, Particles.INITIAL_PARTICLE_NUM.toString());
formHandler.setInputValue(Form.SIMCONTROLS.VELOCITYINPUT, velocityDivisor.toString());
formHandler.setInputValue(Form.SIMCONTROLS.SPEEDINPUT, Particles.INITIAL_SPEED.toString());
formHandler.setInputValue(Form.SIMCONTROLS.MASSINPUT, Particles.INITIAL_MASS.toString());

generateParticles();

const canvas = document.getElementById('canvas');
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  particles.push(
    new Particle({
      ctx: simulation.ctx!,
      x: mouseX,
      y: mouseY,
      radius: 10,
      color: random_hex_color_code(),
      speed: speed,
      velocityX: random_int_from_interval(-2, 2),
      velocityY: random_int_from_interval(-2, 2),
      velocityXMutator: velocityDivisor,
      velocityYMutator: velocityDivisor,
    })
  );

  particleInput.value = particles.length.toString();
});

const animate = () => {
  simulation.clearCanvas();

  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    particle.speed = speed; // Update particle speed

    particle.draw();

    // Calculate the updated position
    const nextX = particle.x + particle.velocityX;
    const nextY = particle.y + particle.velocityY;

    // Check if the updated position exceeds the boundary
    const exceedsBoundaryX = nextX - particle.radius < 0 || nextX + particle.radius > simulation.canvas.width;
    const exceedsBoundaryY = nextY - particle.radius < 0 || nextY + particle.radius > simulation.canvas.height;

    // Adjust the position if it exceeds the boundary
    if (exceedsBoundaryX) {
      particle.velocityX *= -1; // Reverse the X velocity
      particle.x += particle.velocityX; // Update the position
    }

    if (exceedsBoundaryY) {
      particle.velocityY *= -1; // Reverse the Y velocity
      particle.y += particle.velocityY; // Update the position
    }

    // Update the particle's position
    particle.update();

    // Check for collisions with other particles
    for (let j = i + 1; j < particles.length; j++) {
      const otherParticle = particles[j];
      const dx = otherParticle.x - particle.x;
      const dy = otherParticle.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Check if the particles collide
      if (distance < particle.radius + otherParticle.radius) {
        // Calculate the collision normal
        const normalX = dx / distance;
        const normalY = dy / distance;

        // Calculate the relative velocity
        const relativeVelocityX = otherParticle.velocityX - particle.velocityX;
        const relativeVelocityY = otherParticle.velocityY - particle.velocityY;

        // Calculate the projection of relative velocity on the collision normal
        const velocityProjection = relativeVelocityX * normalX + relativeVelocityY * normalY;

        // Check if the particles are moving towards each other
        if (velocityProjection < 0) {
          // Calculate the impulse to be applied based on the mass and velocities of the particles
          const impulse = (2 * velocityProjection) / (particle.mass + otherParticle.mass);

          // Update the velocities of the particles while preserving momentum
          particle.velocityX += impulse * otherParticle.mass * normalX;
          particle.velocityY += impulse * otherParticle.mass * normalY;
          otherParticle.velocityX -= impulse * particle.mass * normalX;
          otherParticle.velocityY -= impulse * particle.mass * normalY;

          // Adjust the positions to prevent overlapping
          const overlap = 0.5 * (distance - particle.radius - otherParticle.radius);
          particle.x -= overlap * normalX;
          particle.y -= overlap * normalY;
          otherParticle.x += overlap * normalX;
          otherParticle.y += overlap * normalY;
        }
      }
    }
  }

  requestAnimationFrame(animate);
};

animate();
