import React, { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import useStateWithRef from '../../utils/hooks/useStateWithRef';

const Carousel = dynamic(
  () => import('@brainhubeu/react-carousel'),
  { ssr: false },
);

const FixedCarousel = forwardRef(({ children, animationSpeed, ...props }, ref) => {
  const [draggable, setDraggable, draggableRef] = useStateWithRef(true);
  const [safeAnimationSpeed, setSafeAnimationSpeed] = useState(animationSpeed);
  const carouselWrapRef = useRef(null);
  const firstClientX = useRef(0);
  const firstClientY = useRef(0);
  const prevClientX = useRef(0);
  const prevClientY = useRef(0);
  const moveAxis = useRef(null);

  const sliderFirstClientX = useRef(0);
  const sliderFirstClientY = useRef(0);

  const directionDetected = useRef(false);

  const handleNvEnter = useCallback((event) => {
    firstClientX.current = event.touches[0].clientX;
    firstClientY.current = event.touches[0].clientY;

    moveAxis.current = null;
  }, []);

  const handleNvMove = useCallback((event) => {
    if (!moveAxis.current) {
      const firstDeltaX = Math.abs(event.touches[0].clientX - firstClientX.current);
      const firstDeltaY = Math.abs(event.touches[0].clientY - firstClientY.current);

      if (firstDeltaX > 5 || firstDeltaY > 5) {
        moveAxis.current = firstDeltaX > firstDeltaY ? 'x' : 'y';
      }
    }

    if (moveAxis.current) {
      // const deltaX = Math.abs(prevClientX.current - event.touches[0].clientX);
      // const deltaY = Math.abs(prevClientY.current - event.touches[0].clientY);
      // if (
      //   (moveAxis.current === 'x' && deltaY > deltaX) ||
      //   (moveAxis.current === 'y' && deltaX > deltaY)
      // ) {
      if (moveAxis.current === 'x' && draggableRef.current) {
        event.preventDefault();
      }
    }

    prevClientX.current = event.touches[0].clientX;
    prevClientY.current = event.touches[0].clientY;
  }, []);

  const handleSliderTouchStart = useCallback((e) => {
    sliderFirstClientX.current = e.touches[0].clientX;
    sliderFirstClientY.current = e.touches[0].clientY;
    setSafeAnimationSpeed(30);
  }, []);

  const handleSliderTouchMove = useCallback((e) => {
    if (!directionDetected.current) {
      const firstDeltaX = Math.abs(e.touches[0].clientX - sliderFirstClientX.current);
      const firstDeltaY = Math.abs(e.touches[0].clientY - sliderFirstClientY.current);

      if (firstDeltaX > 5 || firstDeltaY > 5) {
        if (firstDeltaY > firstDeltaX) {
          if (draggableRef.current) {
            setDraggable(false);
          }
        }
        directionDetected.current = true;
      }
    }
  }, []);

  const handleSliderTouchEnd = useCallback(() => {
    directionDetected.current = false;
    if (!draggableRef.current) {
      setDraggable(true);
    }
    setSafeAnimationSpeed(animationSpeed);
  }, []);


  useEffect(() => {
    carouselWrapRef.current.addEventListener('touchstart', handleNvEnter, true);
    carouselWrapRef.current.addEventListener('touchmove', handleNvMove, true);

    return () => {
      carouselWrapRef.current.removeEventListener('touchstart', handleNvEnter, true);
      carouselWrapRef.current.removeEventListener('touchmove', handleNvMove, true);
    };
  }, []);

  return (
    <div className="carousel-wrap" ref={carouselWrapRef}>
      <Carousel ref={ref} {...props} animationSpeed={safeAnimationSpeed} draggable={draggable} keepDirectionWhenDragging minDraggableOffset={12}>
        {React.Children.map(children, (child) => (
          <div className="slide-wrap" onTouchStart={handleSliderTouchStart} onTouchMove={handleSliderTouchMove} onTouchEnd={handleSliderTouchEnd}>
            {child}
          </div>
        ))}
      </Carousel>
    </div>
  );
});

export default memo(FixedCarousel);
