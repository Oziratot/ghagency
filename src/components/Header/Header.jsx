import React, { forwardRef, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSpring, animated } from 'react-spring';
import classnames from 'classnames';
import Logo from '../../assets/svg/logo.svg';
import YouTubeIcon from '../../assets/svg/youtube.svg';
import YouTubeXsIcon from '../../assets/svg/youtube-xs.svg';
import InstagramIcon from '../../assets/svg/instagram.svg';
import InstagramXsIcon from '../../assets/svg/instagram-xs.svg';
import TelegramIcon from '../../assets/svg/telegram.svg';
import TelegramXsIcon from '../../assets/svg/telegram-xs.svg';
import { PAGES } from '../../constants/pages';
import { getScrollY } from '../../utils/getScroll';
import { getScrollProgress } from '../../utils/getScrollProgress';
import useFbPixel from '../../utils/hooks/useFbPixel';
import useGTag from '../../utils/hooks/useGTag';
import useYMetrika from '../../utils/hooks/useYMetrika';
import OrderCallButton from '../Button/OrderCallButton';
import PhoneIcon from '../../assets/svg/footer-phone.svg';
import { isActive } from '../Nav/Nav';

const CustomA = forwardRef(({ page, closeNav, onClick, href }, ref) => {
  const router = useRouter();
  const { asPath } = router;

  const handleClick = useCallback((e) => {
    closeNav();
    onClick(e);
  }, [onClick]);

  return (
    <a
      ref={ref}
      href={href}
      className={classnames('mobile-nav-link', { _active: isActive(page.key, asPath) })}
      onClick={handleClick}
    >
      {page.label}
    </a>
  );
});

const MobileNavList = memo(({ items, closeNav, withSocialLinks }) => {
  return (
    <ul className="mobile-nav-list">
      {items.map((page) => (
        <li className="mobile-nav-list-item" key={page.key}>
          <Link href={`/${page.key === 'main' ? '' : page.key}`} key={page.key} passHref>
            <CustomA page={page} closeNav={closeNav} />
          </Link>
        </li>
      ))}
      {withSocialLinks && (
        <li className="mobile-nav-list-item social-links">
          <a href="https://www.youtube.com/channel/UCxvUYoLbYJJwtPErQ0vAVNw" className="youtube-link" target="_blank" rel="noreferrer">
            <YouTubeIcon />
          </a>
          <a href="https://www.instagram.com/gha_hockey/" className="instagram-link" target="_blank" rel="noreferrer">
            <InstagramIcon />
          </a>
          <a href="https://t.me/grishatov_hockey_agency" className="telegram-link" target="_blank" rel="noreferrer">
            <TelegramIcon />
          </a>
        </li>
      )}
    </ul>
  );
});

function Header({ mobileNavShown, setMobileNavShown, desktopNavShown, setDesktopNavShown, alertHeight }, ref) {
  const ym = useYMetrika();
  const gtag = useGTag();
  const fbq = useFbPixel();
  const mobileNavFirstRowItems = useMemo(() => PAGES.slice(0, PAGES.length / 2), []);
  const mobileNavSecondRowItems = useMemo(() => PAGES.slice(PAGES.length / 2), []);
  // const headerStyle = useMemo(() => ({ transform: `translateY(${alertHeight}px)` }), [alertHeight]);
  const alertHeightRef = useRef(alertHeight);
  const [headerSpringProps, setHeaderSpringProps] = useSpring(() => ({ transform: 'translateY(0px)' }));
  const [headerBackgroundSpringProps, setHeaderBackgroundSpringProps] = useSpring(() => ({ transform: 'scaleY(1) translateY(0)' }));
  const [headerContentSpringProps, setHeaderContentSpringProps] = useSpring(() => ({ transform: 'translateY(0px)' }));
  const [headerOrderCallAndPhoneSpringProps, setHeaderOrderCallAndPhoneSpringProps] = useSpring(() => ({ transform: 'scale(1)' }));
  const [headerSocialIconsSpringProps, setHeaderSocialIconsSpringProps] = useSpring(() => ({ transform: 'translateX(0px)' }));
  const [headerBurgerSpringProps, setHeaderBurgerSpringProps] = useSpring(() => ({ transform: 'scale(1)', opacity: 0 }));
  const onceSetMaxValue = useRef(false);
  const onceSetNotDesktopValue = useRef(false);
  const handleBurgerClick = useCallback(() => {
    if (window.innerWidth > 1023) {
      setDesktopNavShown(prevDesktopNavShown => !prevDesktopNavShown);
    } else {
      setMobileNavShown(prevMobileNavShown => !prevMobileNavShown);
    }
  }, []);
  const closeNav = useCallback(() => setMobileNavShown(false), []);
  const handlePhoneClick = useCallback(() => {
    ym('reachGoal', 'TEL_CLICKED');
    gtag('event', 'TEL_CLICKED');
    fbq('track', 'TEL_CLICKED');
  }, []);
  const calcHeaderProps = useCallback((forceHeaderTransform) => {
    const scrollY = getScrollY();
    const from = 0;
    const to = ref.current.offsetHeight;

    if (window.innerWidth > 1023) {
      if (scrollY < to) {
        const progress = getScrollProgress(from, to);
        const transformHeader = `translateY(${alertHeightRef.current - (32 * progress)}px)`; // 32 = headerHeight * 0.33
        const transformBackground = `scaleY(${1 - (0.33 * progress)}) translateY(${32 * progress}px)`;
        const transformContent = `translateY(${16 * progress}px)`;
        const transformOrderCallAndPhone = `scale(${1 - (0.1 * progress)})`;
        const transformSocialIcons = `translateX(${0 - (45 * progress)}px)`;
        const transformBurger = `scale(${progress})`;
        // const paddingValue = 25 - (12 * progress);
        // setHeaderSpringProps({ paddingTop: paddingValue, paddingBottom: paddingValue });
        setHeaderSpringProps({ transform: transformHeader });
        setHeaderBackgroundSpringProps({ transform: transformBackground });
        setHeaderContentSpringProps({ transform: transformContent });
        setHeaderOrderCallAndPhoneSpringProps({ transform: transformOrderCallAndPhone });
        setHeaderSocialIconsSpringProps({ transform: transformSocialIcons });
        setHeaderBurgerSpringProps({ transform: transformBurger, opacity: -0.5 + (progress * 1.5) });
        onceSetMaxValue.current = false;
        window.document.body.classList.remove('_fixed-nav');

        // if (desktopNavShownRef.current) {
        //   setDesktopNavShown(false);
        // }
      } else {
        if (!onceSetMaxValue.current || onceSetNotDesktopValue.current) {
          // setHeaderSpringProps({ paddingTop: 12, paddingBottom: 12 });
          setHeaderSpringProps({ transform: `translateY(${alertHeightRef.current - 32}px)` });
          setHeaderBackgroundSpringProps({ transform: 'scale(0.67) translateY(32px)' });
          setHeaderContentSpringProps({ transform: 'translateY(16px)' });
          setHeaderOrderCallAndPhoneSpringProps({ transform: 'scale(0.9)' });
          setHeaderSocialIconsSpringProps({ transform: 'translateX(-45px)' });
          setHeaderBurgerSpringProps({ transform: 'scale(1)', opacity: 1 });
          window.document.body.classList.add('_fixed-nav');
          onceSetMaxValue.current = true;
        } else if (forceHeaderTransform) {
          setHeaderSpringProps({ transform: `translateY(${alertHeightRef.current - 32}px)` });
        }
      }
      onceSetNotDesktopValue.current = false;
    } else {
      if (!onceSetNotDesktopValue.current) {
        // setHeaderSpringProps({ paddingTop: '', paddingBottom: '' });
        setHeaderSpringProps({ transform: `translateY(${alertHeightRef.current}px)` });
        setHeaderBackgroundSpringProps({ transform: 'scale(1) translateY(0px)' });
        setHeaderContentSpringProps({ transform: 'translateY(0px)' });
        setHeaderOrderCallAndPhoneSpringProps({ transform: 'scale(1)' });
        setHeaderSocialIconsSpringProps({ transform: 'translateX(0px)' });
        setHeaderBurgerSpringProps({ transform: 'scale(1)', opacity: 1 });
        window.document.body.classList.remove('_fixed-nav');
        onceSetNotDesktopValue.current = true;
      } else if (forceHeaderTransform) {
        setHeaderSpringProps({ transform: `translateY(${alertHeightRef.current}px)` });
      }
    }
  }, []);

  useEffect(() => {
    alertHeightRef.current = alertHeight;
    calcHeaderProps(true);
  }, [alertHeight]);

  useEffect(() => {
    const onResize = () => {
      calcHeaderProps();
    };

    const onScroll = () => {
      calcHeaderProps();
    };

    window.addEventListener('resize', onResize, false);
    window.addEventListener('scroll', onScroll, false);

    return () => {
      window.removeEventListener('resize', onResize, false);
      window.removeEventListener('scroll', onScroll, false);
    };
  }, []);

  return (
    <animated.header className={classnames('header', { 'mobile-nav-shown': mobileNavShown })} style={headerSpringProps} ref={ref}>
      <animated.div className="header-background" style={headerBackgroundSpringProps} />
      <animated.div className="container" style={headerContentSpringProps}>
        <div className="logo-with-tag">
          <Link href="/">
            <a>
              <Logo className="header-logo" />
            </a>
          </Link>
          <div className="header-tag">Хоккейное агентство — трудоустроим в лиги США&nbsp;и&nbsp;Канады</div>
        </div>
        <div className="contacts">
          <animated.div className="order-call-and-phone" style={headerOrderCallAndPhoneSpringProps}>
            <OrderCallButton>
              Заказать звонок
            </OrderCallButton>
            <a href="tel:79160791214" className="phone-link" onClick={handlePhoneClick}>
              8 (916) 079-12-14
            </a>
          </animated.div>
          <animated.div className="social-links" style={headerSocialIconsSpringProps}>
            <a href="https://www.youtube.com/channel/UCxvUYoLbYJJwtPErQ0vAVNw" className="youtube-link" target="_blank" rel="noreferrer">
              <YouTubeIcon className="icon-desktop" />
              <YouTubeXsIcon className="icon-mobile" />
            </a>
            <a href="https://www.instagram.com/gha_hockey/" className="instagram-link" target="_blank" rel="noreferrer">
              <InstagramIcon className="icon-desktop" />
              <InstagramXsIcon className="icon-mobile" />
            </a>
            <a href="https://t.me/grishatov_hockey_agency" className="telegram-link" target="_blank" rel="noreferrer">
              <TelegramIcon className="icon-desktop" />
              <TelegramXsIcon className="icon-mobile" />
            </a>
          </animated.div>
          <div className="mobile-phone-icon">
            <a href="tel:79160791214" className="phone-icon-link" onClick={handlePhoneClick}>
              <PhoneIcon />
            </a>
          </div>
          <animated.div className={classnames('header-menu-burger', { 'header-menu-burger--close': mobileNavShown || desktopNavShown })} style={headerBurgerSpringProps} onClick={handleBurgerClick}>
            <span />
            <span />
            <span />
          </animated.div>
        </div>
      </animated.div>
      <CSSTransition
        classNames="mobile-nav"
        in={mobileNavShown}
        timeout={600}
        mountOnEnter
        unmountOnExit
      >
        <div className="mobile-nav">
          <div className="container">
            <MobileNavList items={mobileNavFirstRowItems} closeNav={closeNav} />
            <MobileNavList items={mobileNavSecondRowItems} closeNav={closeNav} withSocialLinks />
          </div>
        </div>
      </CSSTransition>
    </animated.header>
  );
}

export default React.forwardRef(Header);
