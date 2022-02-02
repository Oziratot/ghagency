import React, { memo, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { BookFormModalContext } from '../Root/Root';

function BookButton(props) {
  const { children, ...rest } = props;
  const context = useContext(BookFormModalContext);
  const onBookClick = useCallback(() => {
    context.setModalShown(true);
  }, []);

  return (
    <Button {...rest} onClick={onBookClick}>
      {children}
    </Button>
  );
}

BookButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  appearance: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
  tabIndex: PropTypes.string,
  form: PropTypes.string,
};

BookButton.defaultProps = {
  className: '',
  disabled: false,
  loading: false,
  color: 'orange',
  size: 'sm',
  appearance: 'button', // (link|button)
  type: 'button', // (submit|button)
  tabIndex: '',
  form: undefined,
  onClick: () => {},
};

export default memo(BookButton);
