import React from 'react';
import usePageClass from '../hooks/usePageClass';

function withPageClass(className) {
  return (WrappedComponent) => {
    const WithPageClass = (props) => {
      usePageClass(className);

      return React.createElement(WrappedComponent, props);
    };

    WithPageClass.displayName = `WithPageClass(${getDisplayName(WrappedComponent)})`;

    return WithPageClass;
  };
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withPageClass;
