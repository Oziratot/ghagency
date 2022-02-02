import React, { PureComponent } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CollapseContext } from './Collapse';


class CollapsePanel extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    desktopHeight: PropTypes.number,
    mobileHeight: PropTypes.number,
    alwaysShowExpandBtn: PropTypes.bool,
    expandBtnLabel: PropTypes.string,
    collapseBtnLabel: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    desktopHeight: 150, // 25px * 6
    mobileHeight: 102, // 17px * 6
    alwaysShowExpandBtn: false,
    className: '',
    expandBtnLabel: 'Подробнее',
    collapseBtnLabel: '',
  };

  state = {
    expandBtnShown: this.props.alwaysShowExpandBtn,
  }

  contentWrapRef = React.createRef();
  contentRef = React.createRef();

  componentDidMount() {
    this.onResize();
    window.addEventListener('resize', this.onResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false);
  }

  onResize = () => {
    const { expandBtnShown } = this.state;
    const { id, alwaysShowExpandBtn, desktopHeight, mobileHeight } = this.props;
    const { activePanels } = this.context;
    const active = activePanels.includes(id);

    if (!active) {
      if (window.innerWidth > 767) {
        if (this.contentWrapRef.current.clientHeight !== desktopHeight) {
          this.contentWrapRef.current.style.height = `${desktopHeight}px`;
        }
      } else {
        if (this.contentWrapRef.current.clientHeight !== mobileHeight) {
          this.contentWrapRef.current.style.height = `${mobileHeight}px`;
        }
      }
    }
    // remember heights
    if (!alwaysShowExpandBtn) {
      if (this.contentRef.current.scrollHeight > this.contentWrapRef.current.clientHeight) {
        if (!expandBtnShown) {
          this.setState({ expandBtnShown: true });
        }
      } else {
        if (expandBtnShown) {
          this.setState({ expandBtnShown: false });
        }
      }
    }
  };

  handleEnter = (node) => {
    const { desktopHeight, mobileHeight } = this.props;
    node.style.height = `${window.innerWidth > 767 ? desktopHeight : mobileHeight}px`;
  };

  handleEntering = (node) => {
    node.style.height = `${this.contentRef.current.scrollHeight}px`;
  };

  handleEntered = (node) => {
    node.style.height = 'auto';
  };

  handleExit = (node) => {
    node.style.height = `${this.contentRef.current.scrollHeight}px`;
  };

  handleExiting = (node) => {
    const { desktopHeight, mobileHeight } = this.props;
    node.style.height = `${window.innerWidth > 767 ? desktopHeight : mobileHeight}px`;
  };

  handleExited= (node) => {
    const { desktopHeight, mobileHeight } = this.props;
    node.style.height = `${window.innerWidth > 767 ? desktopHeight : mobileHeight}px`; // 25px line height 6 lines
  };

  handleClick = () => {
    const { id } = this.props;
    const { onClick } = this.context;

    onClick(id);
  };

  render() {
    const { id, expandBtnLabel, collapseBtnLabel, className, children } = this.props;
    const { expandBtnShown } = this.state;
    const { activePanels } = this.context;
    const active = activePanels.includes(id);

    return (
      <div className={classnames('collapse-panel', className, { active, full: !expandBtnShown && !active })}>
        <CSSTransition
          classNames="panel-content-wrap"
          timeout={300}
          in={active}
          onEnter={this.handleEnter}
          onEntering={this.handleEntering}
          onEntered={this.handleEntered}
          onExit={this.handleExit}
          onExiting={this.handleExiting}
          onExited={this.handleExited}
        >
          <div className="panel-content-wrap" ref={this.contentWrapRef}>
            <div className="panel-content" ref={this.contentRef}>
              {children}
            </div>
          </div>
        </CSSTransition>
        {expandBtnShown && (
          <div className="panel-collapse-btn" onClick={this.handleClick}>
            <span>{active ? collapseBtnLabel : expandBtnLabel}</span>
          </div>
        )}
      </div>
    );
  }
}

CollapsePanel.contextType = CollapseContext;

export default CollapsePanel;
