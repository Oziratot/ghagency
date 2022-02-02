/* eslint-disable */
// https://stackoverflow.com/a/4819886
export default function isTouchDevice() {
  const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

  const mq = function (query) {
    return window.matchMedia(query).matches;
  };

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}
