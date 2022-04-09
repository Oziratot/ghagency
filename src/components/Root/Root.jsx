import { useRouter } from 'next/router';
import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTransition, config, animated } from 'react-spring';
import classnames from 'classnames';
import useStateWithRef from '../../utils/hooks/useStateWithRef';
import { ReadAlertsManager } from '../../utils/readAlertsManager';
import throttle from '../../utils/throttle';
import AnimatedAlertsMachine from '../Alerts/AnimatedAlertsMachine';
import FeedbackForm from '../FeedbackSection/FeedbackForm';
import Header from '../Header';
import Modal from '../Modal';
import Nav from '../Nav';
import Footer from '../Footer';

const TABLET_MAX_WIDTH = 1023;
const ALERT_LVLS = { ERROR: 'ERROR', IMPORTANT: 'IMPORTANT', INFO: 'INFO', WARNING: 'WARNING' };
const ALERTS = [
  { id: '4', lvl: ALERT_LVLS.INFO, msg: 'Приглашаем на&nbsp;просмотровый турнир в&nbsp;хоккейные лиги Северной Америки и&nbsp;Европы, Москва май-июнь 2022', linkTo: '/services/player-viewing/2022' },
  // { id: '3', lvl: ALERT_LVLS.INFO, msg: 'Приглашаем на просмотровый лагерь для юниоров в Канаде, Торонто, 27 июля - 24 августа' },
  // { id: '2', lvl: ALERT_LVLS.INFO, msg: 'Тестовое объявление' },
];

moment.locale('ru');

export const BookFormModalContext = createContext({ modalShown: false, setModalShown: () => {} });
export const ContactFormModalContext = createContext({ modalShown: false, setModalShown: () => {} });
export const HeaderHeightContext = createContext({ alertHeight: 0, headerHeight: 0, navHeight: 0 });

function Root({ Component, pageProps }) {
  const router = useRouter();
  const [mobileNavShown, setMobileNavShown, mobileNavShownRef] = useStateWithRef(false);
  const [desktopNavShown, setDesktopNavShown, desktopNavShownRef] = useStateWithRef(false);
  const [contactFormModalSubmitLabels, setContactFormModalSubmitLabels] = useState({ first: 'Заказать', second: 'Отправить' });
  const [contactFormModalShown, setContactFormModalShown] = useState(false);
  const [contactFormModalTitle, setContactFormModalTitle] = useState('Закажите бесплатную консультацию');
  const [initialAlertShown, setInitialAlertShown] = useState(false);
  const [headerHeight, setHeaderHeight, headerHeightRef] = useStateWithRef(0);
  const [navHeight, setNavHeight, navHeightRef] = useStateWithRef(0);
  const [alertHeight, setAlertHeight] = useState(0);
  const headerRef = useRef();
  const navRef = useRef();
  const [readAlerts, setReadAlerts] = useState(ReadAlertsManager.get('readAlerts') || {});
  const handleModalClose = useCallback(() => setContactFormModalShown(false), []);

  // useLayoutEffect(() => {
  useEffect(() => {
    setHeaderHeight(headerRef.current.clientHeight);
    setNavHeight(navRef.current?.clientHeight);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setInitialAlertShown(true);
    }, 600);

    const onResize = () => {
      if (desktopNavShownRef.current && window.innerWidth <= TABLET_MAX_WIDTH) {
        setDesktopNavShown(false);
      }
      if (mobileNavShownRef.current && window.innerWidth > TABLET_MAX_WIDTH) {
        setMobileNavShown(false);
      }
      if (headerHeightRef !== headerRef.current.clientHeight) {
        setHeaderHeight(headerRef.current.clientHeight);
      }
      if (navHeightRef !== navRef.current?.clientHeight) {
        setNavHeight(navRef.current?.clientHeight ?? 0);
      }
    };

    const throttledOnResize = throttle(onResize, 100);

    window.addEventListener('resize', throttledOnResize);

    return () => {
      window.removeEventListener('resize', throttledOnResize);
    };
  }, []);

  useEffect(() => {
    if (router.asPath === '/services/player-viewing/2022' && !readAlerts['4']) {
      ReadAlertsManager.set('readAlerts', '4');
      setReadAlerts((prevReadAlerts) => ({ ...prevReadAlerts, '4': true }));
    }
  }, [router.asPath, readAlerts]);

  // const transitions = useTransition(Component, (c) => c, {
  //   from: { opacity: 0, transform: 'translate3d(-20px,0, 0)' },
  //   enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
  //   leave: { position: 'absolute', opacity: 0, transform: 'translate3d(10px,0,0)' },
  //   config: config.stiff,
  // });

  const alerts = useMemo(
    () => ALERTS
      .filter((msg) => !readAlerts[msg.id])
      .map(({ linkTo, ...rest }) => ({
        ...rest,
        ...(linkTo ? { onAlertClick: () => router.push(linkTo) } : null),
      })),
    [readAlerts],
  );
  const alertShown = useMemo(() => initialAlertShown && alerts.length > 0, [initialAlertShown, alerts.length]);

  const readMessage = useCallback(({ id }) => setReadAlerts((prevReadAlerts) => ({ ...prevReadAlerts, [id]: true })), []);

  const contactFormModalContext = useMemo(
    () => ({
      modalShown: contactFormModalShown,
      setModalShown: (modalShown, title = 'Закажите бесплатную консультацию', firstSubmitLabel = 'Заказать', secondSubmitLabel = 'Отправить') => {
        setContactFormModalShown(modalShown);
        setContactFormModalTitle(title);
        setContactFormModalSubmitLabels({ first: firstSubmitLabel, second: secondSubmitLabel });
      },
    }),
    [contactFormModalShown],
  );

  const headerHeightContext = useMemo(
    () => ({ alertHeight, headerHeight, navHeight }),
    [alertHeight, headerHeight, navHeight],
  );

  const pageMinHeight = useMemo(
    () => `calc(100vh - ${headerHeight + navHeight + alertHeight}px)`,
    [alertHeight, headerHeight, navHeight],
  );

  const mainAndFooterStyle = useMemo(() => ({ transform: `translateY(${alertHeight}px)` }), [alertHeight]);

  return (
    <ContactFormModalContext.Provider value={contactFormModalContext}>
      <HeaderHeightContext.Provider value={headerHeightContext}>
        <AnimatedAlertsMachine in={alertShown} alerts={alerts} readMessage={readMessage} setAlertHeight={setAlertHeight} />
        <Header ref={headerRef} mobileNavShown={mobileNavShown} setMobileNavShown={setMobileNavShown} desktopNavShown={desktopNavShown} setDesktopNavShown={setDesktopNavShown} alertHeight={alertHeight} />
        <Nav ref={navRef} desktopNavShown={desktopNavShown} alertHeight={alertHeight} />
        <main className={classnames('main', { 'alert-shown': alertShown })} style={mainAndFooterStyle}>
          {/*<div className="page-content">*/}
          {/*  <Component {...pageProps} />*/}
          {/*</div>*/}
          {/*{transitions.map(({ item: ComponentWithTransition, props, key }) => (*/}
          {/*  <animated.div key={key} style={{ ...props, minHeight: pageMinHeight }} className="page-content">*/}
          <animated.div style={{ minHeight: pageMinHeight }} className="page-content">
            <Component {...pageProps} />
          </animated.div>
          {/*))}*/}
        </main>
        <Footer style={mainAndFooterStyle} />
        <Modal
          className="contact-form-modal"
          header={contactFormModalTitle}
          active={contactFormModalShown}
          onClose={handleModalClose}
        >
          <FeedbackForm topic={contactFormModalTitle} firstSubmitLabel={contactFormModalSubmitLabels.first} secondSubmitLabel={contactFormModalSubmitLabels.second} />
        </Modal>
      </HeaderHeightContext.Provider>
    </ContactFormModalContext.Provider>
  );
}

Root.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

// function areEqual(prevProps, nextProps) {
//   return prevProps.Component === nextProps.Component;
// }

// export default memo(Root, areEqual);
export default Root;
