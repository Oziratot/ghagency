import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import AlertsMachine from './AlertsMachine';

const onAlertsMachineEnter = (node) => {
  node.style.height = '0px';
  node.getBoundingClientRect();
  node.style.height = `${node.getElementsByClassName('ui-alert-machine-content')[0].clientHeight}px`;
};

const onAlertsMachineEntered = (node) => {
  // node.style.height = '';
};

const onAlertsMachineExit = (node) => {
  node.style.height = `${node.getElementsByClassName('ui-alert-machine-content')[0].clientHeight}px`;
  node.getBoundingClientRect();
};

const onAlertsMachineExiting = (node) => {
  node.style.height = '0px';
};

const onAlertsMachineExited = (node) => {
  node.style.height = '';
};

export default class AnimatedAlertsMachine extends React.PureComponent {
  static propTypes = {
    alerts: PropTypes.array.isRequired,
    in: PropTypes.bool,
    readMessage: PropTypes.func,
    setAlertHeight: PropTypes.func,
  };

  static defaultProps = {
    in: false,
    readMessage: () => {},
    setAlertHeight: () => {},
  };

  // to hold alerts before machine will be unmounted
  static getDerivedStateFromProps(nextProps) {
    const { alerts, in: inProp, setAlertHeight } = nextProps;

    if (inProp) {
      return { alerts };
    }

    setAlertHeight(0);

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      alerts: [],
    };
  }

  render() {
    const { readMessage, in: inProp, setAlertHeight } = this.props;
    const { alerts } = this.state;

    return (
      <Transition
        in={inProp}
        mountOnEnter
        unmountOnExit
        timeout={450}
        onEnter={onAlertsMachineEnter}
        onEntered={onAlertsMachineEntered}
        onExit={onAlertsMachineExit}
        onExiting={onAlertsMachineExiting}
        onExited={onAlertsMachineExited}
      >
        <AlertsMachine alerts={alerts} readMessage={readMessage} setAlertHeight={setAlertHeight} />
      </Transition>
    );
  }
}
