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

formHandler.setInputValue(Form.SIMCONTROLS.PARTICLEINPUT, Particles.INITIAL_PARTICLE_NUM.toString());
formHandler.setInputValue(Form.SIMCONTROLS.VELOCITYINPUT, velocityDivisor.toString());
formHandler.setInputValue(Form.SIMCONTROLS.SPEEDINPUT, Particles.INITIAL_SPEED.toString());

generateParticles();

const animate = () => {
  simulation.clearCanvas();

  for (const particle of particles) {
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
    }

    if (exceedsBoundaryY) {
      particle.velocityY *= -1; // Reverse the Y velocity
    }

    // Update the particle's position
    particle.update();
  }
  simulation.boundary.resolveCollisions(particles);

  requestAnimationFrame(animate);
};

animate();
