const random_int_from_interval = (min, max) => {
  let rand = Math.floor(Math.random() * (max - min + 1) + min)

  if (rand === 0) {
    rand = random_int_from_interval(min, max);
  }
  return rand;
}

export default random_int_from_interval;