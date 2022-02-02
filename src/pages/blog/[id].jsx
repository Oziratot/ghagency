/* eslint-disable object-curly-newline */
import React, { memo, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import FeedbackSection from '../../components/FeedbackSection/FeedbackSection';
import Head from '../../components/Head';
import MultipleItemsSlider from '../../components/MultipleItemsSlider/MultipleItemsSlider';
import Page from '../../components/Page';
import { POSTS, CATS } from '../../constants/blog-posts';
import { PLAYERS } from '../../constants/players';

const getBreadcrumbListStructuredData = ({ id, name }) => ({
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
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item":
          {
            "@id": "https://ghockeyagency.ru/blog/${id}",
            "name": "${name}"
          }
        }
      ]
    }
  `,
});

/**
 * @param {string} title
 * @param {string} img - /assets/...
 * @param {string} date - ISO 8601 (# 2020-10-02T09:20:00+08:00)
 * @return {{__html: string}}
 */
const getNewsArticleStructuredData = ({ id, title, img, date }) => ({
  __html: `
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "author": {
        "@type": "Person",
        "name": "Егор Гришатов"
      },
      "publisher": {
        "@type": "SportsOrganization",
        "name": "Grishatov Hockey Agency",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ghockeyagency.ru/assets/img/GHA-og-logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://ghockeyagency.ru/blog/${id}"
      },
      "headline": "${title}",
      "image": ["https://ghockeyagency.ru${img}"],
      "datePublished": "${date}",
      "dateModified": "${date}"
    }
  `,
});

function BlogPost({ id, cat, title, date, subtitle, content, withCurrencyRate, playersInSliderCaption, playersInSlider, seoTitle, seoDesc, imgSrc: img }) {
  const [modifiedContent, setModifiedContent] = useState(content.replace('{{currencyRate}}', '<span class="currency-rate-loader">Загрузка...</span>'));
  const escapedTitle = useMemo(() => title.replace(/\&nbsp;/g, ' '), [title]);
  const BreadcrumbListStructuredData = useMemo(
    () => getBreadcrumbListStructuredData({ id, name: escapedTitle }),
    [id, title],
  );
  const NewsArticleStructuredData = useMemo(
    () => getNewsArticleStructuredData({ id, title: escapedTitle, img, date: moment(date, 'DD.MM.YYYY').format() }),
    [id, title, img, date],
  );

  useEffect(() => {
    if (withCurrencyRate) {
      axios.get('https://free.currconv.com/api/v7/convert?q=USD_CAD&compact=ultra&apiKey=8e99b8270e7ab5307fa2')
        .then(({ data }) => {
          const USDtoCAD = Math.round(data.USD_CAD * 100) / 100;
          setModifiedContent((prevModifiedContent) => prevModifiedContent.replace('<span class="currency-rate-loader">Загрузка...</span>', `1 USD ≈ ${USDtoCAD} CND`));
        });
    }
  }, []);

  return (
    <>
      <Head
        title={seoTitle}
        desc={seoDesc}
        page={`/blog/${id}`}
        breadcrumbsData={BreadcrumbListStructuredData}
      >
        <script name="structured-data-news-article" type="application/ld+json" dangerouslySetInnerHTML={NewsArticleStructuredData} />
      </Head>
      <Page pageKey="blog-post">
        <section className="section section-post">
          <div className="container">
            <Breadcrumbs />
            <h1 className="post-title" dangerouslySetInnerHTML={{ __html: title }} />
            {subtitle && <div className="post-subtitle" dangerouslySetInnerHTML={{ __html: subtitle }} />}
            <Link href={{ pathname: '/blog', query: { filters: cat } }}>
              <a className="post-cat">{CATS[cat]}</a>
            </Link>
            <div className="post-content" dangerouslySetInnerHTML={{ __html: modifiedContent }} />
            {playersInSlider && (
              <>
                <p className="clients-slider-caption" dangerouslySetInnerHTML={{ __html: playersInSliderCaption }} />
                <MultipleItemsSlider className="clients-slider" desktopDots={false} >
                  {PLAYERS.filter((player) => playersInSlider.includes(player.id)).map(({ id, imgSrc, name, role, team, country }) => (
                    <Link href="/players/[id]" as={`/players/${id}`} key={id}>
                      <a className="blog-player-card">
                        <div className="blog-player-card-content">
                          <div className="player-photo" style={{ backgroundImage: `url(${imgSrc})` }} />
                          <div className="player-name">{name}</div>
                          <div className="player-team">{`${role} ${team}, ${country}`}</div>
                        </div>
                        {/*<div className="details-link">*/}
                        {/*  Подробнее*/}
                        {/*</div>*/}
                      </a>
                    </Link>
                  ))}
                </MultipleItemsSlider>
              </>
            )}
            <div className="post-date">{moment(date, 'DD.MM.YYYY').format('DD MMMM YYYY')}</div>
            <div className="founder-block">
              <img loading="lazy" className="founder-photo" srcSet="/assets/img/blog/founder.png, /assets/img/blog/founder@2x.png 2x" src="/assets/img/blog/founder.png" alt="Егор Гришатов - Руководитель хоккейного агентства GHA" />
              <div className="founder-desc">
                <div className="founder-name">Егор Гришатов</div>
                <div className="founder-position">Руководитель <br />хоккейного агентства GHA</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-call-to-action">
          <h2 className="h2 section-title with-overflow">Хотите узнать перспективы трудоустройства в хоккейные клубы США&nbsp;и&nbsp;Канады?</h2>
        </section>

        <FeedbackSection title="Закажите бесплатную консультацию" subtitle="Мы подберем подходящую команду исходя из возраста, уровня и предпочтений игрока." />

        {/*<section className="section section-blog-slider">*/}
        {/*  <div className="container">*/}
        {/*    <h2 className="h2 section-title">Читайте также</h2>*/}
        {/*    <MultipleItemsSlider className="blog-slider">*/}
        {/*      {POSTS.filter(({ id: postId }) => postId !== id).map(({ id: postId, imgSrc, date, title, shortContent }) => (*/}
        {/*        <Link href="/blog/[id]" as={`/blog/${postId}`} key={postId}>*/}
        {/*          <a className="blog-card">*/}
        {/*            <div className="blog-card-img" style={{ backgroundImage: `url(${imgSrc})` }} />*/}
        {/*            <div className="blog-card-desc">*/}
        {/*              /!*<div className="blog-card-date">{date}</div>*!/*/}
        {/*              <div className="blog-card-title" dangerouslySetInnerHTML={{ __html: title }} />*/}
        {/*              <div className="blog-card-content" dangerouslySetInnerHTML={{ __html: shortContent }} />*/}
        {/*            </div>*/}
        {/*          </a>*/}
        {/*        </Link>*/}
        {/*      ))}*/}
        {/*    </MultipleItemsSlider>*/}
        {/*  </div>*/}
        {/*</section>*/}
      </Page>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: 'interview-maxim-tsegelnik' } },
      // { params: { id: 'chl-draft-2020' } }, // deprecated events
      { params: { id: 'junior-leagues-usa-and-canada' } },
      // { params: { id: 'nahl-postponded-season' } }, // deprecated events
      // { params: { id: 'chl-postponded-season' } }, // deprecated events
      { params: { id: 'ohl-junior-league-in-canada' } },
      { params: { id: 'gmhl-junior-league-in-canada' } },
      // { params: { id: 'ehl-signed-with-instat' } }, // deprecated events
      { params: { id: 'whl-junior-league-in-canada' } },
      { params: { id: 'qmjhl-junior-league-in-canada' } },
      { params: { id: 'billet-family-in-usa-and-canada' } },
      { params: { id: 'interview-georgi-larshin' } },
      { params: { id: 'ushl-junior-league-in-usa' } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params: { id } }) {
  return {
    props: {
      ...POSTS.find((post) => post.id === id),
    },
  };
}

export default memo(BlogPost, (prevProps, nextProps) => !nextProps.id);
