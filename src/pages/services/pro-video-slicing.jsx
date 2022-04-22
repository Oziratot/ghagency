import React from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';
import FeedbackSection from '../../components/FeedbackSection/FeedbackSection';
import Head from '../../components/Head';
import PageServices from '../../components/PageServices';
import VideoSlider from '../../components/VideoSlider/VideoSlider';
import useFullHeight from '../../utils/hooks/useFullHeight';

import ReadyPortfolioIcon1 from '../../assets/svg/services/pro-video-slicing/services-pro-video-slicing-resume.svg';
import ReadyPortfolioIcon2 from '../../assets/svg/services/pro-video-slicing/services-pro-video-slicing-play.svg';
import ReadyPortfolioIcon3 from '../../assets/svg/services/pro-video-slicing/services-pro-video-slicing-hockey-player.svg';

import ServicePriceIcon from '../../assets/svg/services/pro-video-slicing/services-pro-video-slicing-wallet.svg';
import ServiceTermIcon from '../../assets/svg/services/pro-video-slicing/services-pro-video-slicing-hourglass.svg';

const readyPortfolioItems = [
  { icon: ReadyPortfolioIcon1, label: 'Видео с лучшими моментами&nbsp;от 2 до 5 минут хронометража' },
  { icon: ReadyPortfolioIcon2, label: 'Игрок подсвечивается специальными видео эффектами (будет выделяться на общем плане)' },
  { icon: ReadyPortfolioIcon3, label: 'В начале ролика презентационная карточка игрока с данными и статистикой' },
];

const videos = [
  { videoId: 'DH86iQKpdRE' }, // Максим Цегельник
  { videoId: 'uAMIb9ioHZM' }, // Никита Соболев
  { videoId: 'A3QJ1yu6O4k' }, // Вадим Фролов
  { videoId: 'V-5eHWE744g' }, // Тихон Ашихмин
  { videoId: 'sYV0PzW2EEw' }, // Вадим Цыркунов
  { videoId: 'ApMaDGWrHJk' }, // Александр Гусейнов
  { videoId: 'tyePbA7qIdw' }, // Олег Гришатов
  { videoId: '5Hs7LqvCwA4' }, // Олег Халемин
  { videoId: 'QBvbwIWEOE8' }, // Юрий Шклярук
  { videoId: 'UT1PONb808g' }, // Арсен Гиндуллин
  { videoId: 'zO97OTK_yLc' }, // Роман Будуев
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
            "@id": "https://ghockeyagency.ru/services/pro-video-slicing",
            "name": "Профессиональные видеонарезки для хоккеистов"
          }
        }
      ]
    }
  `,
};

function ProVideoSlicing() {
  const height = useFullHeight();

  return (
    <>
      <Head
        title="Видеонарезки для хоккеистов от агентство «Grishatov Hockey Agency»"
        desc="Профессиональная видеонарезка повышает шансы трудоустройства хоккеиста. Позволяет выгодно показать игрока и дает возможность получить самые лучшие условия. У нас есть опыт в профессиональном хоккее, мы знаем, на что обращают внимание тренеры и функционеры и сделаем хорошую презентацию игрока."
        page="/services/pro-video-slicing"
        breadcrumbsData={BreadcrumbListStructuredData}
      />
      <PageServices subPageKey="pro-video-slicing">
        <section className="section section-intro" style={{ height }}>
          <div className="container">
            <div className="intro-content">
              <Breadcrumbs />
              <h1 className="h1 section-title">Профессиональные видеонарезки для хоккеистов</h1>
              <p className="intro-desc">Профессиональная видеонарезка существенно повышает шансы трудоустройства в выбранную команду. Грамотное портфолио покажет игрока с самых выгодных сторон и даcт возможность получить наилучшие условия. У наших специалистов есть опыт в профессиональном хоккее, мы знаем, на что обращают внимание зарубежные тренеры и функционеры и самостоятельно выберем лучшие моменты для презентации игрока.</p>
            </div>
            <div className="intro-img">
              <img className="intro-img-raw" srcSet="/assets/img/services/common/1x/services-pro-video-slicing-min.png, /assets/img/services/common/2x/services-pro-video-slicing-min.png 2x" src="/assets/img/services/common/1x/services-pro-video-slicing-min.png" alt="Услуги-Тренировочные лагеря" />
            </div>
          </div>
        </section>
        <section className="section section-you-will-get">
          <div className="container">
            <h2 className="h2">Вы получите готовое портфолио:</h2>
            <ul className="ready-portfolio-list">
              {readyPortfolioItems.map(({ icon: Icon, label }) => (
                <li className="ready-portfolio-list-item" key={label}>
                  <div className="icon-wrap">
                    <Icon />
                  </div>
                  <span dangerouslySetInnerHTML={{ __html: label }} />
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="section section-reviews section-examples">
          <h2 className="h2 section-title">Примеры работ</h2>
          <VideoSlider items={videos} />
        </section>
        <section className="section section-service-details">
          <div className="container">
            <ul className="service-details-list">
              <li className="service-details-list-item">
                <ServicePriceIcon />
                <div className="details-item-label">Стоимость услуги</div>
                <div className="details-item-value">15 000 рублей</div>
              </li>
              <li className="service-details-list-item">
                <ServiceTermIcon />
                <div className="details-item-label">Срок изготовления</div>
                <div className="details-item-value">от 5 до 10 рабочих дней, в&nbsp;зависимости от количества и&nbsp;качества видеоматериала</div>
              </li>
            </ul>
          </div>
        </section>
        <FeedbackSection title="Заказать видеонарезку" subtitle="Оставьте контакт, мы перезвоним и ответим на все вопросы" />
      </PageServices>
    </>
  );
}

export default ProVideoSlicing;
