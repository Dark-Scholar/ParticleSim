import random_int_from_interval from "../utils/random_int_from_interval"

namespace Particles {
  export const INITIAL_PARTICLE_NUM = random_int_from_interval(1, 1000);
  export const INITIAL_VELOCITY_DIVISOR = 5;
  export const INITIAL_SPEED = 1;
  export const INITIAL_MASS = 1;
}

export default Particles;