import CanvasSimulation from './CanvasSimulation';
import random_int_from_interval from './utils/random_int_from_interval';
import random_hex_color_code from './utils/random_hex_color_code';
import Particle from './Particle';
import FormHandler from './FormHandler';
import Form from './enums/Form';
import Particles from './enums/Particles';

const simulation = new CanvasSimulation({ containerId: 'canvas' });
simulation.initialize();

let numParticles = Particles.INITIAL_PARTICLE_NUM;
let velocityDivisor = Particles.INITIAL_VELOCITY_DIVISOR;
let speed = Particles.INITIAL_SPEED;
let particles = [];

const formHandler = new FormHandler(Form.SIMCONTROLS_NAME);
const particleInput = document.getElementById(Form.SIMCONTROLS.PARTICLEINPUT) as HTMLInputElement;
const speedInput = document.getElementById(Form.SIMCONTROLS.SPEEDINPUT) as HTMLInputElement;

let isFirstLoad = true;

const generateParticles = ({ speed }) => {
  const desiredNumParticles = parseInt(particleInput.value, 10) || Particles.INITIAL_PARTICLE_NUM;

  if (desiredNumParticles > particles.length) {
    generateAdditionalParticles({ particles, desiredNumParticles });
  } else if (desiredNumParticles < particles.length) {
    removeParticles({ particles, desiredNumParticles });
  }

  if (isFirstLoad) {
    generateInitialParticles({ particles, numParticles });
    isFirstLoad = false;
  }
};

const generateInitialParticles = ({ particles, numParticles }) => {
  let i = particles.length;
  while (i < numParticles && i < simulation.MAX_ITER) {
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
    generateParticles({ speed });
  }
});

speedInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    speed = parseFloat(speedInput.value) || Particles.INITIAL_SPEED;
    generateParticles({ speed });
  }
});

formHandler.setInputValue(Form.SIMCONTROLS.PARTICLEINPUT, Particles.INITIAL_PARTICLE_NUM.toString());
formHandler.setInputValue(Form.SIMCONTROLS.VELOCITYINPUT, velocityDivisor.toString());
formHandler.setInputValue(Form.SIMCONTROLS.SPEEDINPUT, Particles.INITIAL_SPEED.toString());

generateParticles({ speed });

const animate = () => {
  simulation.clearCanvas();

  for (const particle of particles) {
    particle.speed = speed; // Update particle speed

    particle.draw();
    particle.update();
  }
  simulation.boundary.resolveCollisions(particles);

  requestAnimationFrame(animate);
};

animate();
