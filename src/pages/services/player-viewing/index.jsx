import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import Breadcrumbs from '../../../components/Breadcrumbs';
import FeedbackSection from '../../../components/FeedbackSection/FeedbackSection';
import Head from '../../../components/Head';
import IconLabelList from '../../../components/IconLabelList';
import PageServices from '../../../components/PageServices';
import PhotoSlider from '../../../components/PhotoSlider';
import VideoSlider from '../../../components/VideoSlider/VideoSlider';
import { VIEWS } from '../../../constants/views';
import useFullHeight from '../../../utils/hooks/useFullHeight';

import TournamentIcon1 from '../../../assets/svg/services/player-viewing/services-player-viewing-1.svg';
import TournamentIcon2 from '../../../assets/svg/services/player-viewing/services-player-viewing-2.svg';
import TournamentIcon3 from '../../../assets/svg/services/player-viewing/services-player-viewing-3.svg';
import TournamentIcon4 from '../../../assets/svg/services/player-viewing/services-player-viewing-4.svg';
import TournamentIcon5 from '../../../assets/svg/services/player-viewing/services-player-viewing-5.svg';
import TournamentIcon6 from '../../../assets/svg/services/player-viewing/services-player-viewing-6.svg';
import TournamentIcon7 from '../../../assets/svg/services/player-viewing/services-player-viewing-7.svg';

const tournamentItems = [
  { icon: TournamentIcon1, label: 'Генеральные менеджеры, тренеры и скауты высших юниорских и молодежных лиг США и Канады' },
  { icon: TournamentIcon2, label: 'Индивидуальный анализ и оценка игры от приглашенных специалистов' },
  { icon: TournamentIcon3, label: 'Независимая и объективная оценка игроков на основе анализа нейросетью расширенной статистики' },
  { icon: TournamentIcon4, label: 'Помощь с определением направления продолжения карьеры и план развития игрока' },
  { icon: TournamentIcon5, label: 'Возможность оценить свои шансы на продолжение профессиональной карьеры за океаном не покидая Россию' },
  { icon: TournamentIcon6, label: 'Приглашение лучших игроков продолжить карьеру в зарубежных командах' },
  { icon: TournamentIcon7, label: 'Прямая трансляция на You Tube и полная статистика в открытом доступе' },
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

const view2019 = [
  { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-1-min.jpg' },
  { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-2-min.jpg' },
  { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-3-min.jpg' },
  { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-4-min.jpg' },
  { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-5-min.jpg' },
  { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-6-min.jpg' },
  { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-7-min.jpg' },
  { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-8-min.jpg' },
  { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-9-min.jpg' },
  { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-10-min.jpg' },
];

const view2020 = [
  { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-1.jpg' },
  { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-2.jpg' },
  { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-3.jpg' },
  { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-4.jpg' },
  { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-5.jpg' },
  { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-6.jpg' },
  { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-7.jpg' },
  { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-8.jpg' },
  { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-9.jpg' },
  { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-10.jpg' },
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
            "@id": "https://ghockeyagency.ru/services/player-viewing",
            "name": "Просмотры игроков"
          }
        }
      ]
    }
  `,
};

function PlayerViewing() {
  const height = useFullHeight();
  const [photos2019, setPhotos2019] = useState(view2019);
  const [photos2020, setPhotos2020] = useState(view2020);

  useEffect(() => {
    // TODO: remove after issue resolve and true lazy loading is possible https://github.com/brainhubeu/react-carousel/issues/389
    setTimeout(() => {
      setPhotos2020((prevPhotos) => (
        [
          ...prevPhotos,
          { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-11.jpg' },
          { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-12.jpg' },
          { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-13.jpg' },
          { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-14.jpg' },
          { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-15.jpg' },
          { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-16.jpg' },
          { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-17.jpg' },
          { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-18.jpg' },
          { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-19.jpg' },
          { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-20.jpg' },
          { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-21.jpg' },
          { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-22.jpg' },
          { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-23.jpg' },
          { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-24.jpg' },
        ]
      ));
    }, 2500);

    setTimeout(() => {
      setPhotos2019((prevPhotos) => (
        [
          ...prevPhotos,
          { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-11-min.jpg' },
          { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-12-min.jpg' },
          { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-13-min.jpg' },
          { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-14-min.jpg' },
          { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-15-min.jpg' },
          { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-16-min.jpg' },
          { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-17-min.jpg' },
          { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-18-min.jpg' },
          { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-19-min.jpg' },
          { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-20-min.jpg' },
          { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-21-min.jpg' },
          { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-22-min.jpg' },
          { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-23-min.jpg' },
          { src: '/assets/img/services/player-viewing/view2019/gha-2019-view-24-min.jpg' },
        ]
      ));
    }, 5000);
  }, []);

  return (
    <>
      <Head
        title="Просмотры хоккеистов | хоккейное агентство «GHA»"
        desc="Хоккейное агентство Гришатова ежегодно организовывает просмотровые турниры в Москве и отправляет игроков на крупнейшие просмотровые мероприятия за границу. Участие в турнирах — это реальная возможность быть замеченным и пройти отбор в лучшие команды США и Канады."
        page="/services/player-viewing"
        breadcrumbsData={BreadcrumbListStructuredData}
      />
      <PageServices subPageKey="player-viewing">
        {/*<HeroSliderSection initialSlide={2} />*/}
        <section className="section section-intro" style={{ height }}>
          <div className="container">
            <div className="intro-content">
              <Breadcrumbs />
              <h1 className="h1 section-title">Просмотры хоккеистов</h1>
              <p className="intro-desc">Хоккейное агентство Гришатова ежегодно организовывает просмотровые турниры в Москве и  отправляет игроков на крупнейшие просмотровые мероприятия в Северную Америку. Участие в турнирах — это реальная возможность быть замеченным и пройти отбор в лучшие команды США и Канады.</p>
            </div>
            <img className="intro-img" srcSet="/assets/img/services/common/1x/services-player-viewing-min.jpg, /assets/img/services/common/2x/services-player-viewing-min.jpg 2x" src="/assets/img/services/common/1x/services-player-viewing-min.jpg" alt="Услуги-Просмотры игроков" />
          </div>
        </section>
        <section className="section section-viewing-tournament">
          <div className="container">
            <h2 className="h2 section-title">Просмотровые турниры для юниоров в Москве</h2>
            <IconLabelList items={tournamentItems} />
          </div>
        </section>
        <section className="section section-last-views-results">
          <div className="container">
            <h2 className="h2 section-title with-overflow">Результаты игроков прошлых просмотров</h2>
            <ul className="last-views-list">
              {VIEWS.map(({ id, imgSrc, name, newRole, prevTeam }) => (
                <Link href="/players/[id]" as={`/players/${id}`} key={id}>
                  <a className={classnames('last-views-list-item', id)}>
                    <div className="player-photo" style={{ backgroundImage: `url(${imgSrc})` }} />
                    <div className="player-name">{name}</div>
                    <div className="player-new-role" dangerouslySetInnerHTML={{ __html: newRole }} />
                    <div className="player-prev-team" dangerouslySetInnerHTML={{ __html: `Предыдущий клуб: ${prevTeam}` }} />
                  </a>
                </Link>
              ))}
            </ul>
          </div>
        </section>
        <section className="section section-last-view">
          <h2 className="h2 section-title with-overflow">Просмотр 2020</h2>
          <PhotoSlider items={photos2020} albumTitle="Просмотр 2020" />
        </section>
        <section className="section section-last-view">
          <h2 className="h2 section-title with-overflow">Просмотр 2019</h2>
          <PhotoSlider items={photos2019} albumTitle="Просмотр 2019" />
        </section>
        <section className="section section-reviews">
          <h2 className="h2 section-title">Отзывы</h2>
          <VideoSlider items={reviews} />
        </section>
        <FeedbackSection title="Узнать о предстоящих просмотрах" subtitle="Оставьте контакт, мы перезвоним и ответим на все вопросы" />
      </PageServices>
    </>
  );
}

export default PlayerViewing;
