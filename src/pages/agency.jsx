import React, { useCallback, useRef, useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import Head from '../components/Head';
import MultipleItemsSlider from '../components/MultipleItemsSlider/MultipleItemsSlider';
import FeedbackSection from '../components/FeedbackSection/FeedbackSection';
import FounderSection from '../components/FounderSection';
import Page from '../components/Page';
import CustomLightbox from '../components/PhotoSlider/CustomLightbox';
import PhotoSlider from '../components/PhotoSlider/PhotoSlider';
import VideoSlider from '../components/VideoSlider/VideoSlider';
import useFullHeight from '../utils/hooks/useFullHeight';

const trustReasonsItems = [
  'Предоставляем исчерпывающую информацию о перспективах игрока',
  'Дорожим репутацией и гарантируем выполнение всех условий контакта',
  'Профессиональный подход на всех этапах сотрудничества',
  'Лично заинтересованы в судьбе игрока и несем за него ответственность',
  'Оказываем незамедлительную помощь по всем вопросам',
];

const partnersItems = [
  { src: '/assets/img/agency/partners/Bradford-Rattlers-Canada-min.jpg', name: 'Bradford Rattlers', country: 'Канада' },
  { src: '/assets/img/agency/partners/Bancroft-Rockhounds-Canada-min.jpg', name: 'Bancroft Rockhounds', country: 'Канада' },
  { src: '/assets/img/agency/partners/Cleveland-Barons-USA-min.jpg', name: 'Cleveland Barons', country: 'США' },
  { src: '/assets/img/agency/partners/New-Tecumseth-Civics-Canada-min.jpg', name: 'New Tecumseth Civics', country: 'Канада' },
  { src: '/assets/img/agency/partners/South-Muskoka-Shield-Canada-min.jpg', name: 'South Muskoka Shield', country: 'Канада' },
  { src: '/assets/img/agency/partners/League-GMHL-Canada-min.jpg', name: 'Лига GMHL', country: 'Канада' },
  { src: '/assets/img/agency/partners/Northumberland-Stars-Canada-min.jpg', name: 'Northumberland Stars', country: 'Канада' },
];

const reviews = [
  { videoId: 'ondV1-jpzpA' }, // Шон Уэрф
];

const ghaAndPartnersItems = [
  { src: '/assets/img/agency/album/Sean-Wharf-General-Manager-Bradford-Rattlers-GMHL-min.jpg', alt: 'Хоккейный агент Егор Гришатов и  Шон Уэрф, генеральный менеджер команды Bradford&nbsp;Rattlers, GMHL' },
  { src: '/assets/img/agency/album/Hockey-agent-Egor-Grishatov-and-Bob-Russell-president-and-founder-of-the-GMHL-League-Canada-min.jpg', alt: 'Хоккейный агент Егор Гришатов и Боб Расселл, президент и основатель лиги GMHL, Канада' },
  { src: '/assets/img/agency/album/Hockey-agent-Egor-Grishatov-and-Glen-Campbell-president-and-owner-of-the-Northumberland-Stars-team-GMHL-min.jpg', alt: 'Хоккейный агент Егор Гришатов и Глен Кэмбелл, президент и владелец команды Northumberland Stars, GMHL' },
  { src: '/assets/img/agency/album/Danny-Doublestein-head-coach-of-the-Bancroft-Rockhounds-team-GMHL-min.jpg', alt: 'Хоккейный агент Егор Гришатов и Дэнни Даблштайн, главный тренер команды Bancroft Rockhounds, GMHL' },
];

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
            "@id": "https://ghockeyagency.ru/agency",
            "name": "Агентство"
          }
        }
      ]
    }
  `,
};

function Agency() {
  const height = useFullHeight();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentIndex] = useState(0);
  const handleLightboxClose = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const swipeRef = useRef({ startTime: 0, startX: 0, startY: 0, newX: 0, newY: 0 });
  const handleSwipeEnd = useCallback((e) => {
    const { newX, startX, newY, startY } = swipeRef.current;
    const deltaX = newX - startX;
    const deltaY = newY - startY;
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
      const { index } = e.currentTarget.dataset;
      setCurrentIndex(index * 1);
      setIsLightboxOpen(true);
    }
  }, []);
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

  return (
    <>
      <Head
        title="О хоккейном агентстве «Grishatov Hockey Agency»"
        desc="Хоккейное агентство Гришатова продвигает игроков в хоккейные лиги США и Канады. Организовываем просмотры хоккеистов в Москве и на спортивных мероприятиях в Северной Америке. Консультируем, устраиваем и курируем игроков, а также помогаем подготовиться к продолжению хоккейной карьеры за рубежом."
        page="/agency"
        breadcrumbsData={BreadcrumbListStructuredData}
      />
      <Page pageKey="agency">
        <section className="section section-intro" style={{ height }}>
          <div className="container">
            <div className="intro-content">
              <Breadcrumbs />
              <h1 className="h1 section-title">Агентство Grishatov Hockey Agency</h1>
              <p className="intro-desc">Хоккейное агентство Гришатова занимается трудоустройством хоккеистов с 2015 года и является официальным партнером 19 хоккейных клубов США и Канады. Мы представляем интересы игроков от 14 лет до 21 года в юниорских и молодежных лигах Северной Америки.</p>
            </div>
            <img className="intro-img" srcSet="/assets/img/agency/1x/agency-intro-min.jpg, /assets/img/agency/2x/agency-intro-min.jpg 2x" src="/assets/img/agency/1x/agency-intro-min.jpg" alt="Агентство" />
          </div>
        </section>
        <FounderSection shorterDesktopPhoto />
        <section className="section section-client-trust-reasons">
          <div className="container">
            <h2 className="h2 section-title">5 причин, почему нам доверяют клиенты:</h2>
            <ul className="trust-reasons-list">
              {trustReasonsItems.map((reason, i) => (
                <li key={reason} className="trust-reasons-list-item">
                  <div className="reason-number">{`0${i + 1}`}</div>
                  <div className="reason-text" dangerouslySetInnerHTML={{ __html: reason }} />
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="section section-partnership-agreements">
          <div className="container">
            <h2 className="h2 section-title">Партнерские соглашения с лигами и командами США и Канады</h2>
            <MultipleItemsSlider className="partners-list-slider" desktopSlidesPerPage={4} desktopArrows desktopDots={false}>
              {partnersItems.map(({ src, name, country }, i) => (
                <div
                  key={name}
                  className="partners-list-slider-item"
                  data-index={i}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleSwipeEnd}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleSwipeEnd}
                  onTouchCancel={handleSwipeEnd}
                >
                  <img loading="lazy" src={src} alt={name} className="partnership-agreement-img" />
                  <div className="partner-name">{name}</div>
                  <div className="partner-country">{country}</div>
                </div>
              ))}
            </MultipleItemsSlider>
            <CustomLightbox
              albumTitle="Партнерские соглашения с лигами и командами США и Канады"
              currentImageIndex={currentImageIndex}
              setCurrentIndex={setCurrentIndex}
              isOpen={isLightboxOpen}
              onClose={handleLightboxClose}
              images={partnersItems}
            />
          </div>
        </section>
        <section className="section section-gha-and-foreign-partners">
          {/*<div className="container">*/}
          <h2 className="h2 section-title with-overflow">GHA и зарубежные партнеры</h2>
          <PhotoSlider items={ghaAndPartnersItems} albumTitle="GHA и зарубежные партнеры" withCaptions />
          {/*<MultipleItemsSlider className="gha-and-partners-slider" desktopArrows={true} desktopDots={false}>*/}
          {/*  {ghaAndPartnersItems.map(({ src, campName, dateAndPlace }) => (*/}
          {/*    <div key={src} className="gha-and-partners-slider-item">*/}
          {/*      <img src={src} alt={`${campName}-${dateAndPlace}`} />*/}
          {/*      <div className="camp-name" dangerouslySetInnerHTML={{ __html: campName }} />*/}
          {/*      <div className="date-and-place" dangerouslySetInnerHTML={{ __html: dateAndPlace }} />*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</MultipleItemsSlider>*/}
          {/*</div>*/}
        </section>
        <section className="section section-reviews">
          <h2 className="h2 section-title">Отзывы зарубежных партнеров</h2>
          <VideoSlider items={reviews} />
        </section>
        <FeedbackSection title="Закажите бесплатную консультацию" subtitle="Оставьте контакт, мы перезвоним и ответим на все вопросы" />
      </Page>
    </>
  );
}

export default Agency;
