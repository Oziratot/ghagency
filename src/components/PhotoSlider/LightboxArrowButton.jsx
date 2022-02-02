import React from 'react';
import PropTypes from 'prop-types';
import { animated, useTransition } from 'react-spring';
import ArrowLeftIcon from '../../assets/svg/lightbox-arrow-left.svg';
import ArrowRightIcon from '../../assets/svg/lightbox-arrow-right.svg';

const LightboxArrowButton = ({ position, onClick, disabled }) => {
  const transitions = useTransition(!disabled, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div
          key={key}
          style={{
            ...props,
            zIndex: 999
          }}
        >
          <button className={`lightbox-arrow lightbox-arrow-${position}`} type="button" onClick={onClick}>
            {position === "left" && <ArrowLeftIcon />}
            {position === "right" && <ArrowRightIcon />}
          </button>
        </animated.div>
      )
  );
};

LightboxArrowButton.propTypes = {
  position: PropTypes.oneOf(["left", "right"]).isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

LightboxArrowButton.defaultProps = {
  disabled: false
};

export default LightboxArrowButton;
