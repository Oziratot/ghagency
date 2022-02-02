/* eslint-disable jsx-a11y/alt-text */
import React, { memo } from 'react';
import PropTypes from 'prop-types';

const base = process.env.PUBLIC_PATH;

function Img(props) {
  const { src } = props;
  let srcSet;

  if (props.srcSet) {
    srcSet = props.srcSet
      .split(',')
      .map((path) => `${base}${path.trim()}`)
      .join(', ');
  }

  return (
    <img
      {...props}
      src={`${base}${src}`}
      srcSet={srcSet}
    />
  );
}

Img.propTypes = {
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  alt: PropTypes.string,
  sizes: PropTypes.string,
};

export default memo(Img);
