import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Dots } from '@brainhubeu/react-carousel';
import classnames from 'classnames';
import useStateWithRef from '../../utils/hooks/useStateWithRef';
import throttle from '../../utils/throttle';
import FixedCarousel from '../FixedCarousel';
import SliderArrowLeft from '../SliderArrowLeft';
import SliderArrowRight from '../SliderArrowRight';

function MultipleItemsSlider({ desktopSlidesPerPage, desktopArrows, desktopDots, className, children }) {
  const carouselRef = useRef(null);
  const [value, setValue] = useState(0);
  const [slidesPerScroll, setSlidesPerScroll, slidesPerScrollRef] = useStateWithRef(desktopSlidesPerPage);
  const arrowLeft = <SliderArrowLeft />;
  const arrowRight = <SliderArrowRight value={value} total={children.length} slidesPerScroll={slidesPerScroll} />;
  const breakpoints = useMemo(() => ({
    // 2560: {
    //   slidesPerPage: desktopSlidesPerPage,
    //   slidesPerScroll: desktopSlidesPerPage,
    //   arrowLeft: desktopArrows ? arrowLeft : null,
    //   arrowRight: desktopArrows ? arrowRight : null,
    //   addArrowClickHandler: desktopArrows,
    // },
    1023: {
      slidesPerPage: 2.5,
      slidesPerScroll: 2,
      arrowLeft,
      arrowRight,
      addArrowClickHandler: true,
    },
    720: {
      slidesPerPage: 2.2,
      slidesPerScroll: 2,
      arrowLeft,
      arrowRight,
      addArrowClickHandler: true,
    },
    584: {
      slidesPerPage: 1.5,
      slidesPerScroll: 1,
      arrowLeft,
      arrowRight,
      addArrowClickHandler: true,
    },
    430: {
      slidesPerPage: 1.25,
      slidesPerScroll: 1,
      arrowLeft: null,
      arrowRight: null,
      addArrowClickHandler: false,
      dots: false,
    },
    360: {
      slidesPerPage: 1.2,
      slidesPerScroll: 1,
      arrowLeft: null,
      arrowRight: null,
      addArrowClickHandler: false,
      dots: false,
    },
  }), [arrowRight]);
  const handleChange = useCallback((val) => {
    setValue(val);
  }, []);
  const handleDotClick = useCallback((val) => {
    setValue(val * slidesPerScrollRef.current);
  }, []);
  const onResize = useCallback(throttle(() => {
    const windowWidth = window.innerWidth;
    let activeBreakpoint = null;
    const resolutions = Object.keys(breakpoints);
    resolutions.forEach(resolutionString => {
      const resolution = parseInt(resolutionString);
      if (windowWidth <= resolution) {
        if (!activeBreakpoint || activeBreakpoint > resolution) {
          activeBreakpoint = resolution;
        }
      }
    });
    if (activeBreakpoint) {
      if (breakpoints[activeBreakpoint].slidesPerScroll !== slidesPerScrollRef.current) {
        setSlidesPerScroll(breakpoints[activeBreakpoint].slidesPerScroll);
      }
    } else {
      if (slidesPerScrollRef.current !== desktopSlidesPerPage) {
        carouselRef.current.retry();
        setSlidesPerScroll(desktopSlidesPerPage);
      }
    }
  }, 300), []);

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className={classnames('multiple-items-slider', className)}>
      <FixedCarousel
        ref={carouselRef}
        value={value}
        onChange={handleChange}
        animationSpeed={600}
        slidesPerPage={desktopSlidesPerPage}
        slidesPerScroll={desktopSlidesPerPage}
        // infinite
        // autoPlay={3000}
        // dots={desktopDots}
        breakpoints={breakpoints}
        offset={0}
        centered={false}
        arrowLeft={desktopArrows ? arrowLeft : null}
        arrowRight={desktopArrows ? arrowRight : null}
        addArrowClickHandler={desktopArrows}
      >
        {children}
      </FixedCarousel>
      {desktopDots && <Dots value={Math.floor(value / slidesPerScroll)} onChange={handleDotClick} number={Math.ceil(children.length / slidesPerScroll)} />}
    </div>
  );
}

MultipleItemsSlider.propTypes = {
  desktopSlidesPerPage: PropTypes.number,
  desktopDots: PropTypes.bool,
  desktopArrows: PropTypes.bool,
};

MultipleItemsSlider.defaultProps = {
  desktopSlidesPerPage: 3,
  desktopDots: true,
  desktopArrows: false,
};

export default memo(MultipleItemsSlider);
