import CanvasSimulation from './CanvasSimulation';
import random_int_from_interval from './utils/random_int_from_interval';
import random_hex_color_code from './utils/random_hex_color_code';
import Particle  from './Particle';
import FormHandler from './FormHandler';
import Form from './enums/Form';
import Particles from './enums/Particles';

let numParticles: number = Particles.INITIAL_PARTICLE_NUM;

const formHandler = new FormHandler(Form.SIMCONTROLS_NAME);
formHandler.setInputValue(Form.SIMCONTROLS.PARTICLEINPUT, numParticles.toString());

const simulation = new CanvasSimulation({ containerId: 'canvas' });
simulation.initialize();

const particles: Particle[] = [];

let i = 0;
while (i <= numParticles && i < simulation.MAX_ITER) {
  particles.push(new Particle({
    ctx: simulation.ctx!,
    x: random_int_from_interval(0, simulation.canvas.width),
    y: random_int_from_interval(0, simulation.canvas.height),
    radius: 10,
    color: random_hex_color_code(),
    speed: 1,
    velocityX: random_int_from_interval(-2, 2),
    velocityY: random_int_from_interval(-2, 2),
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