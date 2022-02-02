import { useEffect, useLayoutEffect } from 'react';

export const ssrBodyClassSet = new Set();

function usePageClass(className) {
  if (!process.browser) {
    ssrBodyClassSet.add(className);
    return;
  }

  // useLayoutEffect(
  useEffect(
    () => {
      document.body.classList.add(className);

      return () => {
        document.body.classList.remove(className);
      }
    },
    [className],
  );
}

export default usePageClass;
