import React, { Component } from 'react';
import PropTypes from 'prop-types';
import memoize from 'lodash.memoize';

export const ViewportSize = {
  MOBILE: 'MOBILE',
  TABLET: 'TABLET',
  // SM_DESKTOP: 'SM_DESKTOP',
  DESKTOP: 'DESKTOP',
};

export const ViewportOrientation = {
  PORTRAIT: 'PORTRAIT',
  LANDSCAPE: 'LANDSCAPE',
};

const mobileMaxWidth = 767;
const tabletMaxWidth = 1023;
// const smDesktopMaxWidth = 1365;

const defaultSizes = [
  { key: ViewportSize.MOBILE, max: mobileMaxWidth },
  { key: ViewportSize.TABLET, max: tabletMaxWidth },
  // { key: ViewportSize.SM_DESKTOP, max: smDesktopMaxWidth },
  { key: ViewportSize.DESKTOP, max: Number.POSITIVE_INFINITY },
];

function getViewport(size, orientation) {
  return { size, orientation };
}

function resolver(size, orientation) {
  return size + orientation;
}

const memoizedGetViewport = memoize(getViewport, resolver);

export const ViewportContext = React.createContext();

class ViewportProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    sizes: PropTypes.array,
  };

  static contextTypes = {
    viewport: PropTypes.object,
  };

  static defaultProps = {
    sizes: undefined,
  };

  static getViewportOrientation() {
    // bad practice to use with ssr
    if (!process.browser) return ViewportOrientation.PORTRAIT;

    if (typeof (window.screen) !== 'undefined' && typeof (window.screen.orientation) !== 'undefined') {
      const { orientation } = window.screen;

      if (orientation.angle === 0 || orientation.angle === 180) {
        return ViewportOrientation.PORTRAIT;
      }

      if (orientation.angle === 90 || orientation.angle === -90) {
        return ViewportOrientation.LANDSCAPE;
      }

      if (orientation.type === 'portrait-primary' || orientation.type === 'portrait-secondary') {
        return ViewportOrientation.PORTRAIT;
      }

      if (orientation.type === 'landscape-primary' || orientation.type === 'landscape-secondary') {
        return ViewportOrientation.LANDSCAPE;
      }
    }

    if (typeof (window.orientation) !== 'undefined') {
      if (window.orientation === 0 || window.orientation === 180) {
        return ViewportOrientation.PORTRAIT;
      }

      if (window.orientation === 90 || window.orientation === -90) {
        return ViewportOrientation.LANDSCAPE;
      }
    }

    return window.matchMedia('(orientation: portrait)').matches ?
      ViewportOrientation.PORTRAIT :
      ViewportOrientation.LANDSCAPE;
  }

  constructor(props, context) {
    super(props);

    this.sizes = this.props.sizes ?
      defaultSizes.concat(this.props.sizes).sort((a, b) => a.max - b.max) :
      defaultSizes;

    if (context.viewport) {
      this.state = { ...context.viewport };
    } else {
      this.state = {
        size: this.getViewportSize(),
        orientation: ViewportProvider.getViewportOrientation(),
      };
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('orientationchange', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('orientationchange', this.onResize);
  }

  onResize = () => {
    const size = this.getViewportSize();
    const orientation = ViewportProvider.getViewportOrientation();


    if (size !== this.state.size || orientation !== this.state.orientation) {
      this.setState({
        size,
        orientation,
      });
    }
  };

  getViewportSize() {
    const width = process.browser ? window.innerWidth : 0;

    for (const size of this.sizes) {
      if (width <= size.max) {
        return size.key;
      }
    }

    throw new Error(`Size "${width}px" not found in sizes: ${JSON.stringify(this.sizes)}`);
  }

  render() {
    const { children } = this.props;
    const { size, orientation } = this.state;
    // const props = { viewport: { size, orientation } };
    const value = memoizedGetViewport(size, orientation);

    return (
      <ViewportContext.Provider value={value}>
        {children}
      </ViewportContext.Provider>
    );
  }
}

export default ViewportProvider;
