/* eslint-disable object-curly-newline */
import React, { memo, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import classnames from 'classnames';
import Breadcrumbs from '../../components/Breadcrumbs';
import Collapse from '../../components/Collapse';
import CollapsePanel from '../../components/Collapse/CollapsePanel';
import FeedbackSection from '../../components/FeedbackSection/FeedbackSection';
import Head from '../../components/Head';
import Page from '../../components/Page';
import VideoSlider from '../../components/VideoSlider/VideoSlider';
import { PLAYERS } from '../../constants/players';

const resumeConfig = [
  { id: 'team', label: 'Команда', bold: true },
  { id: 'league', label: 'Лига', bold: true },
  { id: 'country', label: 'Страна' },
  { id: 'role', label: 'Амплуа' },
  { id: 'grip', label: 'Хват' },
  { id: 'height', label: 'Рост' },
  { id: 'weight', label: 'Вес' },
  { id: 'birthday', label: 'Дата рождения' },
  { id: 'agent', label: 'Агент' },
];

const reviews = [
  { videoId: 'DnWVryLPANE' }, // Рязанцев Мирослав
  { videoId: 'cmaHies8Vbc' }, // Цыркунов Вадим
  { videoId: 'QPEtETp_uNk' }, // Степанянц Юлия
  { videoId: 'EJb1iTKlZAg' }, // Цегельник Ирина
  { videoId: '0cuoBKSWfQk' }, // Гусейнов Александр
  { videoId: 'AflFJRhM-as' }, // Шульц Даниил
  { videoId: 'ondV1-jpzpA' }, // Шон Уэрф
];

function BackToAllPlayers() {
  const { query: { id } } = useRouter();
  const playerIndex = PLAYERS.findIndex((player) => player.id === id);
  const showCount = playerIndex > 7 ? `&shownCount=${playerIndex + 1}` : '';

  return (
    <div className="back-to-all-btn-wrap">
      <Link href={`/players?id=${id}${showCount}`} scroll={false}>
        <a className="back-to-all-btn">Все игроки</a>
      </Link>
    </div>
  );
}

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
            "@id": "https://ghockeyagency.ru/players",
            "name": "Игроки"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item":
          {
            "@id": "https://ghockeyagency.ru/players/${id}",
            "name": "${name}"
          }
        }
      ]
    }
  `,
});

function Player({ id, imgSrc, name, review, lgImgSrc, videoId, lgImgCaption, reviewByPlayerOrParent, desc, ...resumeParams }) {
  const initialVideoSlide = useMemo(() => reviews.findIndex((item) => item.videoId === videoId), [videoId]);
  const [activePanels, setActivePanels] = useState([]);
  const BreadcrumbListStructuredData = useMemo(() => getBreadcrumbListStructuredData({ id, name }), [id, name]);
  // const router = useRouter();
  // const backToAllViaHistoryBack = useRef(false);
  // const handleBackClick = useCallback((e) => {
  //   e.preventDefault();
  //
  //   if (backToAllViaHistoryBack.current) {
  //     console.log('via back');
  //     router.back();
  //   } else {
  //     console.log('via push');
  //     router.push('/players');
  //   }
  // }, []);
  // useEffect(() => {
  //   if (window.location.search.startsWith('?goBackToAll')) {
  //     backToAllViaHistoryBack.current = true;
  //     router.replace(router.pathname, router.asPath.replace('?goBackToAll', ''), { shallow: true });
  //   }
  // }, [router.query]);
  return (
    <>
      <Head
        title={`${name} | игрок хоккейного агентства «GHA»`}
        desc={desc || 'Наши клиенты играют в лучших клубах США и Канады и делают успехи в профессиональной карьере. Игроки хоккейного агентства Гришатова.'}
        page={`/players/${id}`}
        breadcrumbsData={BreadcrumbListStructuredData}
      />
      <Page pageKey="player">
        <section className="section section-player">
          <div className="container">
            <Breadcrumbs />
            <div className="player-details">
              <div className="player-photo">
                <img loading="lazy" src={imgSrc} alt={name} />
              </div>
              <div className="player-resume">
                <h1 className="h2 section-title">{name}</h1>
                <ul className="resume-params-list">
                  {resumeConfig.map(({ id, label }) => (
                    <li key={id} className={`resume-params-list-item resume-param-${id}`}>
                      {`${label}: ${resumeParams[id]}`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {review && <div className="player-review" dangerouslySetInnerHTML={{ __html: review }} />}
          </div>
        </section>

        {lgImgSrc && (
          <section className="section section-player-photo">
            <div className="container">
              <img loading="lazy" className="player-lg-photo" src={lgImgSrc} alt={lgImgCaption} />
              <div className="player-lg-photo-caption" dangerouslySetInnerHTML={{ __html: lgImgCaption }} />
            </div>
          </section>
        )}

        {(videoId || reviewByPlayerOrParent) && (
          <section className="section section-reviews">
            <h2 className="h2 section-title">{videoId ? 'Отзывы' : 'Отзыв'}</h2>
            {videoId && <VideoSlider items={reviews} initialSlide={initialVideoSlide} />}
            {!videoId && reviewByPlayerOrParent && (
              <div className="container">
                <div className="text-reviews-list-item-content">
                  <Collapse activePanels={activePanels} onChange={setActivePanels}>
                    <div className="text-review-author">{reviewByPlayerOrParent.author}</div>
                    <CollapsePanel id={reviewByPlayerOrParent.author} className="collapsible-review" expandBtnLabel="Развернуть отзыв" collapseBtnLabel="Свернуть отзыв">
                      {reviewByPlayerOrParent.text}
                    </CollapsePanel>
                  </Collapse>
                </div>
              </div>
            )}
            <BackToAllPlayers />
          </section>
        )}

        {(!videoId && !reviewByPlayerOrParent) && <BackToAllPlayers />}

        <section className="section section-call-to-action">
          <h2 className="h2 section-title with-overflow">Хотите узнать перспективы трудоустройства в хоккейные клубы США&nbsp;и&nbsp;Канады?</h2>
        </section>
        <FeedbackSection title="Закажите бесплатную консультацию" subtitle="Оставьте контакт, мы перезвоним и ответим на все вопросы" />
      </Page>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: 'tsegelnik-maxim' } },
      { params: { id: 'ganabin-egor' } },
      { params: { id: 'stepanyans-artem' } },
      { params: { id: 'trubachev-matvey' } },
      { params: { id: 'guseinov-alexander' } },
      { params: { id: 'valguzov-denis' } },
      { params: { id: 'grishatov-oleg' } },
      { params: { id: 'cirkunov-vadim' } },
      { params: { id: 'ryazancev-miroslav' } },
      { params: { id: 'leontev-yaroslav' } },
      { params: { id: 'builov-vladimir' } },
      { params: { id: 'ashikhmin-tikhon' } },
      { params: { id: 'popov-andrei' } },
      { params: { id: 'zainulin-ismail' } },
      { params: { id: 'grishakov-vladislav' } },
      { params: { id: 'rubtsov-igor' } },
      { params: { id: 'filippenko-nikita' } },
      { params: { id: 'zykov-nazar' } },
      { params: { id: 'smirnov-ilia' } },
      { params: { id: 'bubnov-daniil' } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params: { id } }) {
  return {
    props: {
      ...PLAYERS.find((player) => player.id === id),
      agent: 'Гришатов Егор Александрович',
    },
  };
}

export default memo(Player, (prevProps, nextProps) => !nextProps.id);
