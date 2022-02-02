import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FixedCarousel from '../FixedCarousel';
import SliderArrowLeft from '../SliderArrowLeft';
import SliderArrowRight from '../SliderArrowRight';
import CustomLightbox from './CustomLightbox';

function decodeHtml(html) {
  const txt = window.document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

function decodeHTMLEntities(text) {
  const entities = [
    // ['amp', '&'],
    // ['apos', '\''],
    // ['#x27', '\''],
    // ['#x2F', '/'],
    // ['#39', '\''],
    // ['#47', '/'],
    // ['lt', '<'],
    // ['gt', '>'],
    ['nbsp', ' '],
    // ['quot', '"'],
  ];

  for (let i = 0, max = entities.length; i < max; ++i) text = text.replace(new RegExp(`&${entities[i][0]};`, 'g'), entities[i][1]);

  return text;
}

function PhotoSlider({ className, items, albumTitle, withCaptions }) {
  const [slide, setSlide] = useState(1);
  const breakpoints = useMemo(() => ({
    1023: {
      slidesPerPage: 1.5,
    },
    767: {
      slidesPerPage: 1.25,
      arrowLeft: null,
      arrowRight: null,
      addArrowClickHandler: false,
    },
  }), []);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentIndex] = useState(0);

  const handleLightboxClose = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const swipeRef = useRef({ startTime: 0, startX: 0, startY: 0, newX: 0, newY: 0 });
  const handleSwipeEnd = useCallback((e) => {
    const { newX, startX, newY, startY } = swipeRef.current;
    const deltaX = newX - startX;
    const deltaY = newY - startY;
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
      const { index } = e.currentTarget.dataset;
      setCurrentIndex(index * 1);
      setIsLightboxOpen(true);
    }
  }, []);
  const handleMouseDown = useCallback((e) => {
    swipeRef.current.startTime = Date.now();
    swipeRef.current.startX = e.pageX;
    swipeRef.current.startY = e.pageY;
  }, []);
  const handleMouseMove = useCallback((e) => {
    swipeRef.current.newX = e.pageX;
    swipeRef.current.newY = e.pageY;
  }, []);
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length !== 1) return;
    const touch = e.changedTouches[0];
    swipeRef.current.startTime = Date.now();
    swipeRef.current.startX = touch.pageX;
    swipeRef.current.startY = touch.pageY;
  }, []);
  const handleTouchMove = useCallback((e) => {
    swipeRef.current.newX = e.changedTouches[0].pageX;
    swipeRef.current.newY = e.changedTouches[0].pageY;
  }, []);

  return (
    <div className={classnames('photo-slider', className)}>
      <FixedCarousel
        value={slide}
        onChange={setSlide}
        animationSpeed={500}
        slidesPerPage={3}
        breakpoints={breakpoints}
        centered
        arrowLeft={<SliderArrowLeft />}
        arrowRight={<SliderArrowRight />}
        addArrowClickHandler
      >
        {items.map(({ src, alt = albumTitle }, i) => (
          <div className="photo-slider-item" key={src}>
            <img
              src={src}
              alt={decodeHTMLEntities(alt)}
              data-index={i}
              // onClick={handleImgClick}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleSwipeEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleSwipeEnd}
              onTouchCancel={handleSwipeEnd}
            />
            {withCaptions && <div className="photo-caption" dangerouslySetInnerHTML={{ __html: alt }} />}
          </div>
        ))}
      </FixedCarousel>
      <CustomLightbox
        albumTitle={albumTitle}
        currentImageIndex={currentImageIndex}
        setCurrentIndex={setCurrentIndex}
        isOpen={isLightboxOpen}
        onClose={handleLightboxClose}
        images={items}
        withCaptions
      />
    </div>
  );
}

PhotoSlider.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }),
  ).isRequired,
  albumTitle: PropTypes.string.isRequired,
  withCaptions: PropTypes.bool,
};

PhotoSlider.defaultProps = {
  withCaptions: false,
};

export default memo(PhotoSlider);
