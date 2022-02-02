/* eslint-disable object-curly-newline */
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import Link from 'next/link';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import Breadcrumbs from '../../components/Breadcrumbs';
import FeedbackSection from '../../components/FeedbackSection/FeedbackSection';
import Head from '../../components/Head';
import Page from '../../components/Page';
import { PLAYERS } from '../../constants/players';
import DoubleArrowDownIcon from '../../assets/svg/double-arrow-down.svg';
import { getCoords } from '../../utils/getCoords';

const config = { tension: 125, friction: 20, precision: 0.1 };

const BreadcrumbListStructuredData = {
  __html: `
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement":
      [
        {
          "@type": "ListItem",
          "position": 1,
          "item":
          {
            "@id": "https://ghockeyagency.ru/",
            "name": "Главная"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item":
          {
            "@id": "https://ghockeyagency.ru/players",
            "name": "Игроки"
          }
        }
      ]
    }
  `,
};

function Players() {
  const router = useRouter();
  const { query, query: { id } } = router;
  const playerIndex = useMemo(() => id && PLAYERS.findIndex((player) => player.id === id), [id]);
  const defaultShowCount = useMemo(() => (id && playerIndex > 7 ? playerIndex + 1 : 8), [playerIndex]);
  const { shownCount: queryShowCount } = query;
  const shownCount = queryShowCount || defaultShowCount;
  const [refMap] = useState(() => new Map());
  const transitions = useTransition(PLAYERS.slice(0, shownCount), (item) => item.id, {
    // initial: (item) => async (next) => {
    //   await next({ opacity: 1, height: process.browser ? refMap.get(item).offsetHeight : 'auto' });
    // },
    from: { opacity: 0 },
    enter: (item) => async (next) => await next({ opacity: 1 }),
    leave: (item) => async (next) => await next({ opacity: 0 }),
    // onRest: (item) => {
    //   refMap.get(item).parentElement.style.height = '';
    //   refMap.get(item).parentElement.style.overflow = 'visible';
    // },
    config,
  });
  const handleShowMoreClick = useCallback(() => {
    const newShowCount = shownCount + 8 > PLAYERS.length ? PLAYERS.length : shownCount + 8;
    router.push({
      pathname: '/players',
      query: { shownCount: newShowCount },
    }, undefined, { shallow: true });
  }, [shownCount]);
  useEffect(() => {
    function onResize() {
      for (const ref of refMap.values()) {
        ref.parentElement.style.height = `${ref.offsetHeight}px`;
      }
    }

    window.addEventListener('resize', onResize, false);

    return () => {
      window.removeEventListener('resize', onResize, false);
    };
  }, []);

  useEffect(() => {
    if (query.id) {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      // const selector = `.players-list-item-link.${query.id}`;
      // const playerItem = window.document.querySelector(selector);
      const playerItem = transitions.find(({ item }) => item.id === query.id).item;
      const playerCardTop = getCoords(refMap.get(playerItem)).top;
      const headerOffset = window.document.getElementsByClassName('header')[0].offsetHeight - (window.innerWidth > 1023 ? 32 : 0);
      window.scrollTo(0, playerCardTop - headerOffset);
    }

    return () => {
      window.history.scrollRestoration = 'auto';
    };
  }, [query.id]);

  return (
    <>
      <Head
        title="Игроки хоккейного агентства «Grishatov Hockey Agency»"
        desc="Наши клиенты играют в лучших клубах США и Канады и делают успехи в профессиональной карьере. Игроки хоккейного агентства Гришатова."
        page="/players"
        breadcrumbsData={BreadcrumbListStructuredData}
      />
      <Page pageKey="players">
        <section className="section section-players">
          <div className="container">
            <Breadcrumbs />
            <h1 className="h2 section-title">Игроки</h1>
            <ul className="players-list">
              {transitions.map(({ key, item, item: { id, imgSrc, name, team, league, country, role, birthday }, props }) => (
              // {PLAYERS.map(({ id, imgSrc, name, team, league, country, role, birthday }, i) => (
                <animated.div key={key} style={props} className="players-list-item">
                  <div className="players-list-item-content" ref={(ref) => ref && refMap.set(item, ref)}>
                    <Link href="/players/[id]" as={`/players/${id}`}>
                      <a className={classnames('players-list-item-link', id)}>
                        <div className="player-photo" style={{ backgroundImage: `url(${imgSrc})` }} />
                        <div className="player-desc">
                          <div className="player-name">{name}</div>
                          <div className="player-info">
                            <div className="player-team" dangerouslySetInnerHTML={{ __html: `${team}, ${league}` }} />
                            <div className="player-country">{country}</div>
                            <div className="player-role">{role}</div>
                            <div className="player-birthday">{birthday}</div>
                          </div>
                          <div className="players-details-tip">Подробнее</div>
                        </div>
                      </a>
                    </Link>
                  </div>
                </animated.div>
              ))}
            </ul>
            <CSSTransition in={shownCount < PLAYERS.length} classNames="show-more-block" timeout={300} unmountOnExit>
              <div className="show-more-block">
                <div className="shown-count">{`Показано: ${shownCount} / ${PLAYERS.length}`}</div>
                <button className="show-more-btn" type="button" onClick={handleShowMoreClick}>Показать больше игроков</button>
                <DoubleArrowDownIcon className="show-more-icon" onClick={handleShowMoreClick} />
              </div>
            </CSSTransition>
          </div>
        </section>
        <section className="section section-call-to-action">
          <h2 className="h2 section-title with-overflow">Хотите узнать перспективы трудоустройства в хоккейные клубы США&nbsp;и&nbsp;Канады?</h2>
        </section>
        <FeedbackSection title="Закажите бесплатную консультацию" subtitle="Оставьте контакт, мы перезвоним и ответим на все вопросы" />
      </Page>
    </>
  );
}

export default Players;
