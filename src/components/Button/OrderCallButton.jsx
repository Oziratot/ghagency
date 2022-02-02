import React, { memo, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { ContactFormModalContext } from '../Root/Root';

function OrderCallButton(props) {
  const { children, modalTitle, firstSubmitLabel, secondSubmitLabel, ...rest } = props;
  const context = useContext(ContactFormModalContext);
  const onOrderCallClick = useCallback(() => {
    context.setModalShown(true, modalTitle, firstSubmitLabel, secondSubmitLabel);
  }, [modalTitle, firstSubmitLabel, secondSubmitLabel]);

  return (
    <Button {...rest} onClick={onOrderCallClick}>
      {children}
    </Button>
  );
}

OrderCallButton.propTypes = {
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
  modalTitle: PropTypes.string,
  firstSubmitLabel: PropTypes.string,
  secondSubmitLabel: PropTypes.string,
};

OrderCallButton.defaultProps = {
  className: '',
  disabled: false,
  loading: false,
  color: 'orange',
  size: 'sm',
  appearance: 'button', // (link|button)
  type: 'button', // (submit|button)
  tabIndex: '',
  form: undefined,
  modalTitle: 'Закажите бесплатную консультацию',
  firstSubmitLabel: 'Заказать',
  secondSubmitLabel: 'Отправить',
  onClick: () => {},
};

export default memo(OrderCallButton);
