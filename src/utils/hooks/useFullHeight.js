import { useContext, useMemo } from 'react';
import { HeaderHeightContext } from '../../components/Root/Root';

function useFullHeight() {
  const { alertHeight, headerHeight, navHeight } = useContext(HeaderHeightContext);
  return useMemo(
    () => `calc(100vh - ${headerHeight + navHeight + alertHeight}px)`,
    [alertHeight, headerHeight, navHeight],
  );
}

export default useFullHeight;
