import { useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import { getCoords } from '../getCoords';

function useQuerySection() {
  const { query: { section } } = useRouter();

  useLayoutEffect(
    () => {
      let onLoadEventAdded = false;
      const onLoad = () => {
        if (section) {
          if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
          }
          const sectionElement = window.document.getElementsByClassName(`section-${section}`)[0];
          if (sectionElement) {
            const header = window.document.getElementsByClassName('header')[0];
            window.scrollTo(0, getCoords(sectionElement).top - header.offsetHeight + (window.innerWidth > 1023 ? 32 : 0));
          }
        }
      };

      if (window.document.readyState === 'complete') {
        onLoad();
      } else {
        onLoadEventAdded = true;
        window.addEventListener('load', onLoad);
      }

      return () => {
        if (onLoadEventAdded) {
          window.removeEventListener('load', onLoad);
        }
      };
    },
    [section],
  );
}

export default useQuerySection;
