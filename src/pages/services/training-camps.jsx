import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';
import FeedbackSection from '../../components/FeedbackSection/FeedbackSection';
import Head from '../../components/Head';
import HeroSliderSection from '../../components/HeroSliderSection';
import IconLabelList from '../../components/IconLabelList';
import PageServices from '../../components/PageServices';
import PhotoSlider from '../../components/PhotoSlider/PhotoSlider';
// import VideoSlider from '../../components/VideoSlider/VideoSlider';
import useFullHeight from '../../utils/hooks/useFullHeight';

import SupervisingContents1 from '../../assets/svg/services/training-camps/services-training-camps-contents-1.svg';
import SupervisingContents2 from '../../assets/svg/services/training-camps/services-training-camps-contents-2.svg';
import SupervisingContents3 from '../../assets/svg/services/training-camps/services-training-camps-contents-3.svg';
import SupervisingContents4 from '../../assets/svg/services/training-camps/services-training-camps-contents-4.svg';
import SupervisingContents5 from '../../assets/svg/services/training-camps/services-training-camps-contents-5.svg';
import SupervisingContents6 from '../../assets/svg/services/training-camps/services-training-camps-contents-6.svg';
import SupervisingContents7 from '../../assets/svg/services/training-camps/services-training-camps-contents-7.svg';

import ClearPricingIcon1 from '../../assets/svg/services/training-camps/services-training-camps-wallet.svg';
import ClearPricingIcon2 from '../../assets/svg/services/training-camps/services-training-camps-contract.svg';

const supervisingContentsItems = [
  { icon: SupervisingContents1, label: 'Проконсультируем по выбору тренировочного лагеря' },
  { icon: SupervisingContents2, label: 'Поможем оформить документы, в том числе визу и медицинскую страховку' },
  { icon: SupervisingContents3, label: 'Подберем подходящие авиабилеты' },
  { icon: SupervisingContents4, label: 'Организуем встречу игрока в аэропорту и его отправку обратно' },
  { icon: SupervisingContents5, label: 'Проследим за условиями тренировочного процесса' },
  { icon: SupervisingContents6, label: 'Проконтролируем бытовые условия проживания' },
  { icon: SupervisingContents7, label: 'Окажем помощь при возникновении непредвиденных ситуаций' },
];

// const reviews = [
//   { videoId: 'ondV1-jpzpA' }, // Шон Уэрф
//   { videoId: 'AflFJRhM-as' }, // Шульц Даниил
//   { videoId: 'DnWVryLPANE' }, // Рязанцев Мирослав
//   { videoId: 'cmaHies8Vbc' }, // Цыркунов Вадим
//   { videoId: '0cuoBKSWfQk' }, // Гусейнов Александр
//   { videoId: 'QPEtETp_uNk' }, // Степанянц Юлия
//   { videoId: 'EJb1iTKlZAg' }, // Цегельник Ирина
// ];

const trainingCampsPhotos = [
  { src: '/assets/img/services/training-camps/album/gha-camp-1-min.jpg' },
  { src: '/assets/img/services/training-camps/album/gha-camp-2-min.jpg' },
  { src: '/assets/img/services/training-camps/album/gha-camp-3-min.jpg' },
  { src: '/assets/img/services/training-camps/album/gha-camp-4-min.jpg' },
  { src: '/assets/img/services/training-camps/album/gha-camp-5-min.jpg' },
  { src: '/assets/img/services/training-camps/album/gha-camp-6-min.jpg' },
  { src: '/assets/img/services/training-camps/album/gha-camp-7-min.jpg' },
  { src: '/assets/img/services/training-camps/album/gha-camp-8-min.jpg' },
  { src: '/assets/img/services/training-camps/album/gha-camp-9-min.jpg' },
  { src: '/assets/img/services/training-camps/album/gha-camp-10-min.jpg' },
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
            "@id": "https://ghockeyagency.ru/services",
            "name": "Услуги"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item":
          {
            "@id": "https://ghockeyagency.ru/services/training-camps",
            "name": "Тренировочные лагеря для хоккеистов"
          }
        }
      ]
    }
  `,
};

function TrainingCamps() {
  const height = useFullHeight();
  const [photos, setPhotos] = useState(trainingCampsPhotos);

  useEffect(() => {
    // TODO: remove after issue resolve and true lazy loading is possible https://github.com/brainhubeu/react-carousel/issues/389
    setTimeout(() => {
      setPhotos(prevPhotos => (
        [
          ...prevPhotos,
          { src: '/assets/img/services/training-camps/album/gha-camp-11-min.jpg' },
          { src: '/assets/img/services/training-camps/album/gha-camp-12-min.jpg' },
          { src: '/assets/img/services/training-camps/album/gha-camp-13-min.jpg' },
          { src: '/assets/img/services/training-camps/album/gha-camp-14-min.jpg' },
          { src: '/assets/img/services/training-camps/album/gha-camp-15-min.jpg' },
          { src: '/assets/img/services/training-camps/album/gha-camp-16-min.jpg' },
          { src: '/assets/img/services/training-camps/album/gha-camp-17-min.jpg' },
          { src: '/assets/img/services/training-camps/album/gha-camp-18-min.jpg' },
          { src: '/assets/img/services/training-camps/album/gha-camp-19-min.jpg' },
          { src: '/assets/img/services/training-camps/album/gha-camp-20-min.jpg' },
          { src: '/assets/img/services/training-camps/album/gha-camp-21-min.jpg' },
          { src: '/assets/img/services/training-camps/album/gha-camp-22-min.jpg' },
          { src: '/assets/img/services/training-camps/album/gha-camp-23-min.jpg' },
          { src: '/assets/img/services/training-camps/album/gha-camp-24-min.jpg' },
          { src: '/assets/img/services/training-camps/album/gha-camp-25-min.jpg' },
          { src: '/assets/img/services/training-camps/album/gha-camp-26-min.jpg' },
          { src: '/assets/img/services/training-camps/album/gha-camp-27-min.jpg' },
          { src: '/assets/img/services/training-camps/album/gha-camp-28-min.jpg' },
          { src: '/assets/img/services/training-camps/album/gha-camp-29-min.jpg' },
        ]
      ))
    }, 3000);
  }, []);

  return (
    <>
      <Head
        title="Хоккейные лагеря — хоккейное агентство «GHA»"
        desc="Хоккейное агентство Гришатова ежегодно организовывает тренировочные лагеря для юниоров. Это отличная возможность продолжить тренировки в межсезонье и повысить свои профессиональные навыки. Матчи посещают скауты высших лиг, игрок может проявить себя и получить приглашение в команду."
        page="/services/training-camps"
        breadcrumbsData={BreadcrumbListStructuredData}
      />
      <PageServices subPageKey="training-camps">
        <HeroSliderSection initialSlide={1} />
        <section className="section section-intro" style={{ height }}>
          <div className="container">
            <div className="intro-content">
              <Breadcrumbs />
              <h1 className="h1 section-title">Тренировочные лагеря для хоккеистов</h1>
              <p className="intro-desc">Хоккейное агентство Гришатова ежегодно организовывает тренировочные лагеря за рубежом для юниоров. Это отличная возможность продолжить тренировки в межсезонье и повысить свои профессиональные навыки под руководством лучших зарубежных тренеров. Выставочные матчи хоккейных лагерей посещают скауты высших лиг, игрок может проявить себя и получить приглашение в команду.</p>
            </div>
            <img className="intro-img" srcSet="/assets/img/services/common/1x/services-training-camps-min.jpg, /assets/img/services/common/2x/services-training-camps-min.jpg 2x" src="/assets/img/services/common/1x/services-training-camps-min.jpg" alt="Услуги-Тренировочные лагеря" />
          </div>
        </section>
        <section className="section section-training-camps-abroad">
          <div className="container">
            <h2 className="h2 section-title">Ежегодные тренировочные лагеря за рубежом</h2>
            <ul className="training-camps-abroad-list">
              <li className="training-camps-abroad-list-item">
                <div className="img-wrap">
                  <img loading="lazy" className="elite-prospects-logo" src="/assets/img/services/training-camps/services-training-camps-elite-prospects.png" alt="Elite Prospects" />
                </div>
                <div className="h4">Elite Prospects Camp</div>
                <p>Канада</p>
              </li>
              <li className="training-camps-abroad-list-item">
                <div className="img-wrap">
                  <img loading="lazy" className="zhockey-logo" src="/assets/img/services/training-camps/services-training-camps-zhockey.png" alt="zHockey" />
                </div>
                <div className="h4">Z-Hockey Camp</div>
                <p>Белоруссия</p>
              </li>
            </ul>
          </div>
        </section>
        <section className="section section-training-camp-supervising-contents">
          <div className="container">
            <h2 className="h2 section-title">Всю организацию берем на себя:</h2>
            <IconLabelList items={supervisingContentsItems} />
          </div>
        </section>
        <section className="section section-clear-pricing">
          <div className="container">
            <h2 className="h2 section-title">Полностью прозрачное ценообразование</h2>
            <ul className="training-camps-clear-pricing-list">
              <li className="training-camps-clear-pricing-list-item">
                <ClearPricingIcon1 />
                <p>Стоимость лагеря фиксирована и отражена в договоре, который вы заключаете напрямую с тренировочным лагерем</p>
              </li>
              <li className="training-camps-clear-pricing-list-item">
                <ClearPricingIcon2 />
                <p>Организационные услуги агентства прописываются в отдельном договоре и содержат четкий перечень работ</p>
              </li>
            </ul>
          </div>
        </section>
        <section className="section section-photo-reports">
          <h2 className="h2 section-title">Фотоотчеты</h2>
          <PhotoSlider items={photos} albumTitle="Фотоотчеты тренировочных лагерей" />
        </section>
        {/*<section className="section section-reviews section-reviews-camps">*/}
        {/*  <h2 className="h2 section-title with-overflow">Отзывы</h2>*/}
        {/*  <VideoSlider items={reviews} />*/}
        {/*</section>*/}
        <FeedbackSection title="Узнать больше о тренировочных лагерях" subtitle="Оставьте контакт, мы перезвоним и ответим на все вопросы" />
      </PageServices>
    </>
  );
}

export default TrainingCamps;
