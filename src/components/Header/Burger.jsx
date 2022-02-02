import React from 'react';
import classnames from 'classnames';

function Burger({ closeNavButtonShown, onClick }) {
  return (
    <div className={classnames('header-menu-burger', { 'header-menu-burger--close': closeNavButtonShown })} onClick={onClick}>
      <span />
      <span />
      <span />
    </div>
  );
}

export default Burger;
