import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ReadAlertsManager } from '../../utils/readAlertsManager';

import ErrorIcon from '../../assets/svg/alerts/error-alert.svg';
import ImportantIcon from '../../assets/svg/alerts/important-alert.svg';
import InfoIcon from '../../assets/svg/alerts/info-alert.svg';
import WarningIcon from '../../assets/svg/alerts/warning-alert.svg';
import CloseIcon from '../../assets/svg/close.svg';
import throttle from '../../utils/throttle';

const lvlToIconAndClass = {
  ERROR: { icon: ErrorIcon, classname: 'error' },
  IMPORTANT: { icon: ImportantIcon, classname: 'important' },
  INFO: { icon: InfoIcon, classname: 'info' },
  WARNING: { icon: WarningIcon, classname: 'warning' },
};

export default class AlertsMachine extends React.PureComponent {
  static propTypes = {
    alerts: PropTypes.array.isRequired,
    readMessage: PropTypes.func,
    setAlertHeight: PropTypes.func,
  };

  static defaultProps = {
    readMessage: () => {},
    setAlertHeight: () => {},
  };

  alertMachineContentRef = React.createRef();
  state = {
    alertHeight: 0,
  };

  componentDidMount() {
    this.updateHeight();
    window.addEventListener('resize', this.throttledOnResize);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.alerts !== prevProps.alerts) {
      this.updateHeight();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttledOnResize);
  }

  onAlertClick = ({ id, onAlertClick }) => {
    if (onAlertClick) {
      onAlertClick();
      const data = { alertRead: true };

      ReadAlertsManager.set('readAlerts', id);
      this.props.readMessage({ id, data });
    }
  };

  onAlertCloseClick = (e, { id }) => {
    e.stopPropagation();

    const data = { alertRead: true };

    ReadAlertsManager.set('readAlerts', id);
    this.props.readMessage({ id, data });
  };

  onResize = () => {
    if (this.alertMachineContentRef.current.clientHeight !== this.state.alertHeight) {
      this.updateHeight();
    }
  };

  throttledOnResize = throttle(this.onResize, 100).bind(this);

  updateHeight = () => {
    const alerts = this.alertMachineContentRef.current.getElementsByClassName('ui-alert-machine-item');
    const alertHeight = alerts[0].clientHeight;
    this.setState({ alertHeight });
    this.props.setAlertHeight(alertHeight);
  };

  render() {
    const { alerts } = this.props;
    const { alertHeight } = this.state;

    return (
      <div className="ui-alert-machine" style={{ height: `${alertHeight}px` }}>
        <div className="ui-alert-machine-content" ref={this.alertMachineContentRef}>
          <TransitionGroup component={null}>
            {alerts.slice(0, 1).map((alert) => {
              const lvlConf = lvlToIconAndClass[alert.lvl];
              const lvlClass = lvlConf.classname;
              const Icon = lvlConf.icon;

              return (
                <CSSTransition
                  key={alert.id}
                  timeout={450}
                  classNames="ui-alert-machine-item"
                >
                  <div className={classnames('ui-alert-machine-item', `ui-alert-machine-item-${lvlClass}`, { _clickable: !!alert.onAlertClick })} onClick={() => this.onAlertClick(alert)}>
                    <div className="container">
                      <Icon className="ui-alert-machine-icon" />
                      <div className="ui-alert-machine-text" dangerouslySetInnerHTML={{ __html: alert.msg }} />
                      <div className="ui-alert-machine-close" onClick={(e) => this.onAlertCloseClick(e, alert)}><CloseIcon /></div>
                    </div>
                  </div>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}
