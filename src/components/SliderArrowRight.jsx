import React, { memo } from 'react';
import classnames from 'classnames';
import ArrowRightIcon from '../assets/svg/slider-arrow-right.svg';

function SliderArrowRight({ value, total, slidesPerScroll }) {
  const disabled = value + slidesPerScroll >= total;

  return (
    <div className={classnames('slider-arrow-right', { disabled })}>
      <ArrowRightIcon />
    </div>
  );
}

export default memo(SliderArrowRight);
