import { getScrollY } from './getScroll';

export function getScrollProgress(from, to) {
  const scrollY = getScrollY();
  const d = to - from;

  if (scrollY <= from) {
    return 0;
  }
  if (scrollY >= to) {
    return 1;
  }

  return (scrollY - from) / d;
}
