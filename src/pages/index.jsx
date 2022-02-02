import Link from 'next/link';
import React from 'react';
import MultipleItemsSlider from '../components/MultipleItemsSlider';
import FeedbackSection from '../components/FeedbackSection';
import FounderSection from '../components/FounderSection';
import HeroSliderSection from '../components/HeroSliderSection';
import VideoSlider from '../components/VideoSlider';
import Page from '../components/Page';
import { SERVICES } from '../constants/services';
import { PLAYERS } from '../constants/players';
import { POSTS } from '../constants/blog-posts';

import AdvantagesSportSelectionIcon from '../assets/svg/main/advantages-sport-selection.svg';
import AdvantagesProfessionalGrowthIcon from '../assets/svg/main/advantages-professional-growth.svg';
import AdvantagesInternationalEducationIcon from '../assets/svg/main/advantages-international-education.svg';
import AdvantagesEmigrationOpportunitiesIcon from '../assets/svg/main/advantages-emigration-opportunities.svg';
import AdvantagesForeignLanguageLearningIcon from '../assets/svg/main/advantages-foreign-language-learning.svg';

const advantagesAbroad = [
  { icon: AdvantagesSportSelectionIcon, label: 'Отбор по&nbsp;спортивному принципу' },
  { icon: AdvantagesProfessionalGrowthIcon, label: 'Профессиональный рост игрока' },
  { icon: AdvantagesInternationalEducationIcon, label: 'Получение международного образования' },
  { icon: AdvantagesEmigrationOpportunitiesIcon, label: 'Возможность эмиграции в&nbsp;США&nbsp;и&nbsp;Канаду' },
  { icon: AdvantagesForeignLanguageLearningIcon, label: 'Изучение иностранного языка' },
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

const leaguesUsa = [
  { label: 'USHL' },
  { label: 'NAHL' },
  { label: 'NCDC' },
  { label: 'EHL' },
  { label: 'NA3HL' },
  { label: 'USPHL-ELITE' },
  { label: 'T1EHL-U16' },
  { label: 'USPHL-PREMIER' },
  { label: 'WSHL' },
  { label: 'T1EHL-U18' },
  { label: 'NCAA' },
  { label: 'NCAA-III' },
  { label: 'ECHL' },
  { label: 'SPHL' },
  { label: 'FPHL' },
];

const leaguesCanada = [
  { label: 'WHL', blogId: 'whl-junior-league-in-canada' },
  { label: 'OHL', blogId: 'ohl-junior-league-in-canada' },
  { label: 'QMJHL', blogId: 'qmjhl-junior-league-in-canada' },
  { label: 'GMHL', blogId: 'gmhl-junior-league-in-canada' },
  { label: 'GTHL' },
  { label: 'CSSHLE' },
  { label: 'OJHL' },
];

function Index() {
  return (
    <Page pageKey="home">
      <HeroSliderSection />
      <section className="section section-our-services">
        <div className="container">
          <h1 className="h2 section-title blue-line">Хоккейное агентство GHA</h1>
          <ul className="our-services-list">
            {SERVICES.map(({ id, icon: Icon, label }) => (
              <li className="our-services-list-item" key={label}>
                <Link href={`/services/${id}`}>
                  <a className="service-link">
                    <Icon className="service-icon" />
                    <div className="service-label" dangerouslySetInnerHTML={{ __html: label }} />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section section-advantages-abroad">
        <div className="container">
          <h2 className="h2 section-title">Преимущества хоккейной карьеры за&nbsp;рубежом</h2>
          <ul className="advantages-abroad-list">
            {advantagesAbroad.map(({ icon: Icon, label }) => (
              <li className="advantages-abroad-list-item" key={label}>
                <Link href="/services/find-job-abroad?section=abroad-career-advantages" scroll={false}>
                  <a className="service-link">
                    <div className="advantage-icon-wrap">
                      <Icon className="advantage-icon" />
                    </div>
                    <div className="advantage-label" dangerouslySetInnerHTML={{ __html: label }} />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FounderSection withDetailsBtn />
      <section className="section section-clients">
        <div className="container">
          <h2 className="h2 section-title">Наши клиенты</h2>
          <MultipleItemsSlider className="clients-slider" desktopArrows>
            {PLAYERS.map(({ id, imgSrc, name, league, country }) => (
              <Link href="/players/[id]" as={`/players/${id}`} key={id}>
                <a className={`player-card ${id}`}>
                  <div className="player-card-content">
                    <div className="player-photo" style={{ backgroundImage: `url(${imgSrc})` }} />
                    <div className="player-name">{name}</div>
                    <div className="player-league">{`${league}, ${country}`}</div>
                  </div>
                  <div className="details-link">
                    Подробнее
                  </div>
                </a>
              </Link>
            ))}
          </MultipleItemsSlider>
        </div>
      </section>
      <section className="section section-reviews">
        <h2 className="h2 section-title">Отзывы</h2>
        <VideoSlider items={reviews} />
      </section>
      <section className="section section-leagues-usa">
        <div className="container">
          <h2 className="h2">Работаем с хоккейными лигами&nbsp;США</h2>
          <ul className="leagues-list">
            {leaguesUsa.map(({ label, blogId }) => (
              <li className="leagues-list-item" key={label}>
                {blogId && (
                  <Link href="/blog/[id]" as={`/blog/${blogId}`}>
                    <a>
                      {label}
                    </a>
                  </Link>
                )}
                {!blogId && (
                  <span>
                    {label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section section-leagues-canada">
        <div className="container">
          <h2 className="h2">Работаем с хоккейными лигами&nbsp;Канады</h2>
          <ul className="leagues-list">
            {leaguesCanada.map(({ label, blogId }) => (
              <li className="leagues-list-item" key={label}>
                {blogId && (
                  <Link href="/blog/[id]" as={`/blog/${blogId}`}>
                    <a>
                      {label}
                    </a>
                  </Link>
                )}
                {!blogId && (
                  <span>
                    {label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section section-blog-slider">
        <div className="container">
          <h2 className="h2 section-title">Блог</h2>
          <MultipleItemsSlider className="blog-slider" desktopDots={false}>
            {POSTS.map(({ id, imgSrc, date, shortTitle, title, shortContent }) => (
              <Link href="/blog/[id]" as={`/blog/${id}`} key={id}>
                <a className="blog-card">
                  <div className="blog-card-img" style={{ backgroundImage: `url(${imgSrc})` }} />
                  <div className="blog-card-desc">
                    <div className="blog-card-date">{date}</div>
                    <div className="blog-card-title" dangerouslySetInnerHTML={{ __html: shortTitle || title }} />
                    <div className="blog-card-content" dangerouslySetInnerHTML={{ __html: shortContent }} />
                  </div>
                </a>
              </Link>
            ))}
          </MultipleItemsSlider>
        </div>
      </section>
      <FeedbackSection title="Закажите бесплатную консультацию" subtitle="Мы подробно расскажем о карьерных&nbsp;перспективах Вашего&nbsp;ребенка" />
    </Page>
  );
}

export default Index;
