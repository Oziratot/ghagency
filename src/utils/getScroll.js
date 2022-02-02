export function getScrollY(el) {
  if (typeof (window) === 'undefined') {
    return 0;
  }

  if (el) {
    return el.scrollTop;
  }

  return window.scrollY || window.pageYOffset;
}
