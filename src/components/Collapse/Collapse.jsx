import React, { createContext, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

export const CollapseContext = createContext({ activePanels: [], onClick: () => {} });

function Collapse(props) {
  const { activePanels, children, onChange } = props;
  const onClick = useCallback(
    (id) => {
      if (activePanels.includes(id)) {
        onChange(activePanels.filter((activeId) => activeId !== id));
      } else {
        onChange([...activePanels, id]);
      }
    },
    [activePanels, onChange],
  );
  const contextValue = useMemo(() => ({
    activePanels,
    onClick,
  }), [activePanels, onClick]);

  return (
    <CollapseContext.Provider value={contextValue}>
      {children}
    </CollapseContext.Provider>
  );
}

Collapse.propTypes = {
  children: PropTypes.node,
  activePanels: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Collapse;
