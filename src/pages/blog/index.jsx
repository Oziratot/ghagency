/* eslint-disable object-curly-newline */
import moment from 'moment';
import { useRouter } from 'next/router';
import { stringify } from 'qs';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import Link from 'next/link';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import Breadcrumbs from '../../components/Breadcrumbs';
import FeedbackSection from '../../components/FeedbackSection/FeedbackSection';
import Head from '../../components/Head';
import Page from '../../components/Page';
import { CATS, POSTS } from '../../constants/blog-posts';
import DoubleArrowDownIcon from '../../assets/svg/double-arrow-down.svg';

const config = { tension: 125, friction: 20, precision: 0.1 };

const filtersListItems = Object.entries(CATS).map(([id, label]) => ({ id, label }));

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
            "@id": "https://ghockeyagency.ru/blog",
            "name": "Блог"
          }
        }
      ]
    }
  `,
};

function Blog() {
  const router = useRouter();
  const { query: { shownCount = 6, filters } } = router;
  const parsedFilters = filters ? filters.split(',') : [];
  const currentShownCount = useRef(shownCount);
  const prevShownCount = useRef(shownCount);
  const [refMap] = useState(() => new Map());
  const sortedPosts = POSTS.sort((a, b) => moment(b.date, 'DD.MM.YYYY').format('x') - moment(a.date, 'DD.MM.YYYY').format('x'));
  const filteredPosts = parsedFilters.length ? sortedPosts.filter((post) => parsedFilters.includes(post.cat)) : sortedPosts;
  const transitions = useTransition(filteredPosts.slice(0, shownCount), (item) => item.id, {
    // initial: (item) => async (next) => {
    //   await next({ opacity: 1, height: process.browser ? refMap.get(item).offsetHeight : 'auto' });
    //   refMap.get(item).parentElement.style.overflow = 'visible';
    // },
    immediate: (item) => prevShownCount.current === currentShownCount.current,
    from: (item) => prevShownCount.current === currentShownCount.current ? {} : { opacity: 0 },
    enter: (item) => async (next) => await next({ opacity: 1 }),
    leave: (item) => async (next) => await next(prevShownCount.current === currentShownCount.current ? {} : { opacity: 0 }),
    onRest: (item) => {
      refMap.get(item).parentElement.style.height = '';
      refMap.get(item).parentElement.style.overflow = 'visible';
    },
    config,
  });

  const filteredTransitions = parsedFilters.length ? transitions.filter(({ item }) => parsedFilters.includes(item.cat)) : transitions;
  const filteredPostsCount = useMemo(
    () => parsedFilters.length ? POSTS.filter(({ cat }) => parsedFilters.includes(cat)).length : POSTS.length,
    [parsedFilters],
  );

  const handleShowMoreClick = useCallback(() => {
    const newShowCount = shownCount + 6 > POSTS.length ? POSTS.length : shownCount + 6;
    const query = {};

    if (newShowCount !== 6) {
      query.shownCount = newShowCount;
    }
    if (parsedFilters.length) {
      query.filters = parsedFilters;
    }

    currentShownCount.current = newShowCount;
    prevShownCount.current = shownCount;

    router.push(`/blog${stringify(query, { addQueryPrefix: true, arrayFormat: 'comma' })}`, undefined, { shallow: true });
  }, [shownCount, filters]);

  const handleFilterChange = useCallback(({ target }) => {
    const newFilters = target.checked ? [...parsedFilters, target.name] : parsedFilters.filter(((filter) => filter !== target.name));
    const query = {};

    if (shownCount !== 6) {
      query.shownCount = shownCount;
    }
    if (newFilters.length) {
      query.filters = newFilters;
    }

    currentShownCount.current = shownCount;
    prevShownCount.current = shownCount;

    router.push(`/blog${stringify(query, { addQueryPrefix: true, arrayFormat: 'comma' })}`, undefined, { shallow: true });
  }, [shownCount, filters]);

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

  return (
    <>
      <Head
        title="Блог хоккейного агентства «Grishatov Hockey Agency»"
        desc="Статьи о хоккейных лигах Канады и США, о карьере хоккеистов за границей. Интервью, как живут наши игроки за рубежом."
        page="/blog"
        breadcrumbsData={BreadcrumbListStructuredData}
      />
      <Page pageKey="blog">
        <section className="section section-blog">
          <div className="container">
            <Breadcrumbs />
            <h1 className="h2 section-title">Блог для хоккеистов</h1>
            <ul className="blog-filters-list">
              {filtersListItems.map(({ id, label }) => (
                <li key={id} className="blog-filters-list-item">
                  <div className="checkbox-wrap">
                    <input
                      type="checkbox"
                      name={id}
                      id={`filter-${id}`}
                      checked={parsedFilters.includes(id)}
                      onChange={handleFilterChange}
                    />
                    <label htmlFor={`filter-${id}`}>
                      <span className="label-text" dangerouslySetInnerHTML={{ __html: label }} />
                    </label>
                  </div>
                </li>
              ))}
            </ul>
            <ul className="blog-posts-list">
              {filteredTransitions.map(({ key, item, item: { id, imgSrc, date, shortTitle, title, shortContent }, props }) => (
                <animated.div key={key} style={props} className="blog-posts-list-item">
                  <div className="blog-posts-list-item-content" ref={(ref) => ref && refMap.set(item, ref)}>
                    <Link href="/blog/[id]" as={`/blog/${id}`}>
                      <a className={classnames('blog-card blog-posts-list-item-link', id)}>
                        <div className="blog-card-img" style={{ backgroundImage: `url(${imgSrc})` }} />
                        <div className="blog-card-desc">
                          <div className="blog-card-date">{date}</div>
                          <div className="blog-card-title" dangerouslySetInnerHTML={{ __html: shortTitle || title }} />
                          <div className="blog-card-content" dangerouslySetInnerHTML={{ __html: shortContent }} />
                        </div>
                      </a>
                    </Link>
                  </div>
                </animated.div>
              ))}
            </ul>
            <CSSTransition in={shownCount < filteredPostsCount} classNames="show-more-block" timeout={300} unmountOnExit>
              <div className="show-more-block">
                <div className="shown-count">{`Показано: ${shownCount >= filteredPostsCount ? filteredPostsCount : shownCount} / ${filteredPostsCount}`}</div>
                <button className="show-more-btn" type="button" onClick={handleShowMoreClick}>Загрузить еще статьи</button>
                <DoubleArrowDownIcon className="show-more-icon" onClick={handleShowMoreClick} />
              </div>
            </CSSTransition>
          </div>
        </section>
        {/*<section className="section section-call-to-action">*/}
        {/*  <h2 className="h2 section-title with-overflow">Хотите узнать перспективы трудоустройства в хоккейные клубы США и Канады?</h2>*/}
        {/*</section>*/}
        <FeedbackSection title="Закажите бесплатную консультацию" subtitle="Оставьте контакт, мы перезвоним и ответим на все вопросы" />
      </Page>
    </>
  );
}

export default Blog;
