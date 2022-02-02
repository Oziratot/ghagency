// functions from this article: https://learn.javascript.ru/js-animation

/**
 * @param {Object} options
 * @param {number} options.duration
 * @param {function} options.timing
 * @param {function} options.draw
 * @returns {Promise}
 */
export function animate(options) {
  return new Promise((resolve) => {
    const start = performance.now();

    requestAnimationFrame(function anim(time) {
      let timeFraction = (time - start) / options.duration;
      if (timeFraction > 1) timeFraction = 1;

      const progress = options.timing(timeFraction);

      options.draw(progress);

      if (timeFraction < 1) {
        requestAnimationFrame(anim);
      } else {
        resolve();
      }
    });
  });
}

export function circ(timeFraction) {
  const timeFr = timeFraction < 0 ? 0 : timeFraction;
  return 1 - Math.sin(Math.acos(timeFr));
}

export function quad(progress) {
  return progress * progress;
}

export function makeEaseOut(timing) {
  return function easeOut(timeFraction) {
    return 1 - timing(1 - timeFraction);
  };
}
