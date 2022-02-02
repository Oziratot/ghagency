import React from 'react';
import { LinksContext } from '../contexts/linksContext';

function withNavLinks(WrappedComponent) {
  const WithNavLinks = (props) => (
    <LinksContext.Consumer>
      {({ navLinks, setNavLinks }) => (
        <WrappedComponent navLinks={navLinks} setNavLinks={setNavLinks} {...props} />
      )}
    </LinksContext.Consumer>
  );

  WithNavLinks.displayName = `WithNavLinks(${getDisplayName(WrappedComponent)})`;

  return WithNavLinks;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withNavLinks;
