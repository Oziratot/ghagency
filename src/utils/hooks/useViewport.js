import { useContext } from 'react';
import { ViewportContext } from '../../components/ViewportProvider';

/**
 * @typedef {Object} Viewport
 * @property {string} size - MOBILE | TABLET | DESKTOP
 * @property {string} orientation - PORTRAIT | LANDSCAPE
 */
/**
 * @returns {Viewport}
 */
function useViewport() {
  return useContext(ViewportContext);
}

export default useViewport;
