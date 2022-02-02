import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import YouTube from 'react-youtube';
import FixedCarousel from '../FixedCarousel';
import SliderArrowLeft from '../SliderArrowLeft';
import SliderArrowRight from '../SliderArrowRight';

import YouTubePlay from '../../assets/svg/youtube-play.svg';

function VideoSlider({ className, items, initialSlide }) {
  const [slide, setSlide] = useState(initialSlide);
  const [playingId, setPlayingId] = useState(null);
  const [lazyLoadedIds, setLazyLoadedIds] = useState({});
  const swipeRef = useRef({ startTime: 0, startX: 0, startY: 0, newX: 0, newY: 0 });
  const refsById = useRef({});
  const handleFirstClick = useCallback((e) => {
    const id = e.currentTarget.dataset.videoId;
    if (lazyLoadedIds[id]) return;
    setLazyLoadedIds((prevState) => ({ ...prevState, [id]: true }));
  }, [lazyLoadedIds]);
  const handleReady = useCallback((e) => {
    refsById.current[e.target.getVideoData().video_id] = e.target;
    e.target.playVideo();
  }, []);
  const handleStateChange = useCallback((e) => {
    const videoId = e.target.getVideoData().video_id;
    setPlayingId(e.data === 1 ? videoId : null);
  }, []);
  const handleChange = useCallback((value) => {
    if (playingId) {
      refsById.current[playingId].pauseVideo();
    }
    setSlide(value);
  }, [playingId]);
  const handleVideoClick = useCallback((e) => {
    const id = e.currentTarget.dataset.videoId;
    if (!lazyLoadedIds[id]) {
      handleFirstClick(e);
      return;
    }
    if (!refsById.current[id]) return;
    if (playingId === id) {
      refsById.current[id].pauseVideo();
    } else {
      refsById.current[id].playVideo();
    }
  }, [playingId, lazyLoadedIds]);
  const handleSwipeEnd = useCallback((e) => {
    const { newX, startX, newY, startY } = swipeRef.current;
    const deltaX = newX - startX;
    const deltaY = newY - startY;
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
      handleVideoClick(e);
    }
  }, [handleVideoClick]);
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
  const breakpoints = useMemo(() => ({
    1023: {
      slidesPerPage: 1.5,
      // dots: true,
    },
    767: {
      slidesPerPage: 1.25,
      dots: false,
      arrowLeft: null,
      arrowRight: null,
      addArrowClickHandler: false,
    },
  }), []);

  return (
    <div className={classnames('video-slider', className)}>
      <FixedCarousel
        value={slide}
        onChange={handleChange}
        animationSpeed={500}
        slidesPerPage={3}
        breakpoints={breakpoints}
        centered
        arrowLeft={<SliderArrowLeft />}
        arrowRight={<SliderArrowRight />}
        addArrowClickHandler
      >
        {items.map(({ videoId }) => (
          <div className={classnames('video-slider-item', { playing: videoId === playingId })} key={videoId}>
            <div
              className="video-foreground"
              data-video-id={videoId}
              // onClick={handleVideoClick}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleSwipeEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleSwipeEnd}
              onTouchCancel={handleSwipeEnd}
            />
            {!lazyLoadedIds[videoId] && (
              <div className="video-preview" data-video-id={videoId}>
                <YouTubePlay className="youtube-play-button" />
                <img src={`https://img.youtube.com/vi/${videoId}/sddefault.jpg`} alt={`youtube-video-${videoId}`} />
              </div>
            )}
            {lazyLoadedIds[videoId] && (
              <YouTube containerClassName="youtube-player-container" videoId={videoId} opts={{ autoplay: 1, playerVars: { autohide: 0, showinfo: 0, rel: 0, modestbranding: 1, disablekb: 1, controls: 2, wmode: 'transparent', mode: 'opaque' }}} onReady={handleReady} onStateChange={handleStateChange} />
            )}
          </div>
        ))}
      </FixedCarousel>
    </div>
  );
}

VideoSlider.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      videoId: PropTypes.string,
    }),
  ).isRequired,
  initialSlide: PropTypes.number,
};

VideoSlider.defaultProps = {
  initialSlide: 1,
};

export default memo(VideoSlider);
