import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classnames from 'classnames';
import { PAGES } from '../../constants/pages';

let onceBigDesktopRecalculatedFlag = false;

export function isActive(pageKey, asPath) {
  switch (pageKey) {
    case 'main':
      return (asPath.slice(0, asPath.indexOf('?')) || asPath) === '/';
    case 'services/player-viewing/2022':
      return asPath === '/services/player-viewing/2022';
    case 'services':
      return asPath !== '/services/player-viewing/2022' && asPath.includes(pageKey);
    default:
      return asPath.includes(pageKey);
  }
}

function Nav({ desktopNavShown, alertHeight }, ref) {
  const router = useRouter();
  const { asPath } = router;
  const navWrapStyle = useMemo(() => ({ transform: `translateY(${alertHeight}px)` }), [alertHeight]);
  const navListRef = useRef();
  const [lineCfg, setLineCfg] = useState({ lineOffset: 0, lineWidth: 0 });
  const { lineOffset, lineWidth } = lineCfg;
  const calcLineCfg = useCallback(() => {
    const activeLinkEl = navListRef.current.getElementsByClassName('_active')[0];
    // if (activeLinkEl) {
      // const activeLinkPadding = parseInt(getComputedStyle(activeLinkEl).paddingLeft, 10);
      // return { lineOffset: activeLinkEl.offsetLeft + activeLinkPadding, lineWidth: activeLinkEl.clientWidth - activeLinkPadding * 2 };
    // }
    return { lineOffset: activeLinkEl?.offsetLeft ?? 0, lineWidth: activeLinkEl?.clientWidth ?? 0 };
  }, [navListRef]);

  useEffect(() => {
    const onResize = () => {
      // laptop width 1024 - 1679, desktop 1680+
      if (window.innerWidth < 1680) {
        onceBigDesktopRecalculatedFlag = false;
        setLineCfg(calcLineCfg());
      } else {
        if (!onceBigDesktopRecalculatedFlag) {
          setLineCfg(calcLineCfg());
          onceBigDesktopRecalculatedFlag = true;
        }
      }
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    setLineCfg(calcLineCfg());
  }, [asPath]);

  const lineStyle = useSpring({ transform: `translateX(${lineOffset}px)`, width: `${lineWidth}px` });

  return (
    <div className="nav-wrap" style={navWrapStyle}>
      <nav className={classnames('nav', { '_desktop-shown': desktopNavShown })} ref={ref}>
        <div className="container">
          <div className="nav-list" ref={navListRef}>
            {PAGES.map((page) => (
              <Link href={`/${page.key === 'main' ? '' : page.key}`} key={page.key}>
                <a className={classnames('nav-link', { _active: isActive(page.key, asPath) })}>
                  {page.label}
                </a>
              </Link>
            ))}
            <animated.div className="nav-line" style={lineStyle} />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default React.forwardRef(Nav);
