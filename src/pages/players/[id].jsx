/* eslint-disable object-curly-newline */
import React, { memo, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import classnames from 'classnames';
import classnames from 'classnames';
import YouTube from 'react-youtube';
import Breadcrumbs from '../../components/Breadcrumbs';
import Collapse from '../../components/Collapse';
import CollapsePanel from '../../components/Collapse/CollapsePanel';
import FeedbackSection from '../../components/FeedbackSection/FeedbackSection';
import Head from '../../components/Head';
import Page from '../../components/Page';
import VideoSlider from '../../components/VideoSlider/VideoSlider';
import { PLAYERS } from '../../constants/players';
import YouTubePlay from '../../assets/svg/youtube-play.svg';

const resumeConfig = [
  { id: 'team', label: 'Команда', bold: true },
  { id: 'league', label: 'Лига', bold: true },
  { id: 'country', label: 'Страна' },
  { id: 'prevteam', label: 'Предыдущий\u00A0клуб' },
  { id: 'role', label: 'Амплуа' },
  { id: 'birthday', label: 'Год рождения' },
  { id: 'clientsince', label: '' },
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
  const video = useMemo(() => ({ videoId }), [videoId]);
  const vidoeArr = [video];
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
                      {id === 'clientsince' ? `Клиент агенства с ${resumeParams[id]} года` : (
                        <>
                          <p>{`${label}:`}&nbsp;<span className="resume-params-list-item-text">{resumeParams[id]}</span></p>
                        </>
                      )}
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

        {videoId && (
          <section className="section section-video-review">
            <h2 className="h2 section-title with-overflow">Отзыв игрока</h2>
            <VideoSlider player items={vidoeArr} />
          </section>
        )}

        {reviewByPlayerOrParent && (
          <section className="section section-reviews">
            <h2 className="h2 section-title">Отзыв родителей</h2>
            {/*{videoId && <VideoSlider items={reviews} initialSlide={initialVideoSlide} />}*/}
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
      { params: { id: 'ashikhmin-tikhon' } },
      { params: { id: 'babets-danil' } },
      { params: { id: 'bachalov-timur' } },
      { params: { id: 'bogachev-danila' } },
      { params: { id: 'boktaev-ernest' } },
      { params: { id: 'bubnov-daniil' } },
      { params: { id: 'buduev-roman' } },
      { params: { id: 'buylov-vladimir' } },
      { params: { id: 'bulahov-savva' } },
      { params: { id: 'valiullin-amir' } },
      { params: { id: 'grachev-arseniy' } },
      { params: { id: 'grishatov-oleg' } },
      { params: { id: 'ershov-nikolay' } },
      { params: { id: 'ivanov-sergei' } },
      { params: { id: 'ispalatov-egor' } },
      { params: { id: 'kabanov-denis' } },
      { params: { id: 'kabataev-egor' } },
      { params: { id: 'kleimenov-kirill' } },
      { params: { id: 'korotaev-iliya' } },
      { params: { id: 'levitskiy-stepan' } },
      { params: { id: 'mullagaliev-amir' } },
      { params: { id: 'pochuev-danil' } },
      { params: { id: 'rudskoy-egor' } },
      { params: { id: 'sayamov-daniil' } },
      { params: { id: 'sinodkin-denis' } },
      { params: { id: 'smirnov-anton' } },
      { params: { id: 'smirnov-ilia' } },
      { params: { id: 'sobolev-nikita' } },
      { params: { id: 'suschenko-sergei' } },
      { params: { id: 'terenin-sergei' } },
      { params: { id: 'trubachev-matvey' } },
      { params: { id: 'frolov-vadim' } },
      { params: { id: 'tsegelnik-maxim' } },
      { params: { id: 'chebanu-yaroslav' } },
      { params: { id: 'shalimov-sergei' } },
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
