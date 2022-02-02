import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import DomHolder from './DomHolder';

class CollapsibleElement extends PureComponent {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    initialHeight: PropTypes.number,
    usingMaxHeight: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    mountOnEnter: PropTypes.bool,
    unmountOnExit: PropTypes.bool,
    timeout: PropTypes.number,
  };

  static defaultProps = {
    initialHeight: 0,
    usingMaxHeight: false,
    mountOnEnter: true,
    unmountOnExit: true,
    timeout: 300,
  };

  prop = this.props.usingMaxHeight ? 'maxHeight' : 'height';

  handleEnter = (node) => {
    const { initialHeight, timeout } = this.props;
    node.style[this.prop] = `${initialHeight}px`;
    node.style.transitionDuration = `${timeout}ms`;
  };

  handleEntering = (node) => {
    const height = node.querySelector('.collapsible-element-content').offsetHeight;
    node.style[this.prop] = `${height}px`;
  };

  handleEntered = (node) => {
    node.style[this.prop] = this.prop === 'maxHeight' ? 'none' : 'auto';
    node.style.transitionDuration = '';
  };

  handleExit = (node) => {
    const height = node.querySelector('.collapsible-element-content').offsetHeight;
    node.style[this.prop] = `${height}px`;
    node.style.transitionDuration = `${this.props.timeout}ms`;
  };

  handleExiting = (node) => {
    node.style[this.prop] = `${this.props.initialHeight}px`;
  };

  handleExited= (node) => {
    node.style[this.prop] = `${this.props.initialHeight}px`;
    node.style.transitionDuration = '';
  };

  render() {
    const { active, children, className, mountOnEnter, unmountOnExit, timeout } = this.props;

    return (
      <CSSTransition
        classNames="collapsible-element"
        in={active}
        timeout={timeout}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onEntered={this.handleEntered}
        onExit={this.handleExit}
        onExiting={this.handleExiting}
        onExited={this.handleExited}
      >
        <div className="collapsible-element">
          <div className={classnames('collapsible-element-content', className)}>
            <DomHolder>
              {children}
            </DomHolder>
          </div>
        </div>
      </CSSTransition>
    );
  }
}

export default CollapsibleElement;
