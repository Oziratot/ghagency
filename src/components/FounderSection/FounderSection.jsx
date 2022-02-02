import Link from 'next/link';
import React, { memo } from 'react';
import PropTypes from 'prop-types';

function FounderSection({ shorterDesktopPhoto, withDetailsBtn }) {
  return (
    <section className="section section-founder">
      <div className="container">
        <h2 className="h2 founder-title">
          <span className="founder-title-first-line">
            <span className="founder-first-name">Егор</span>
            <span className="founder-position"><span className="absolute">хоккейный агент, </span>основатель хоккейного агентства GHA</span>
          </span>
          <span className="founder-title-second-line">
            <span className="founder-last-name">Гришатов</span>
          </span>
        </h2>
        <div className="founder-photo-and-desc">
          <div className="founder-photo-block">
            {!shorterDesktopPhoto && <img src="/assets/img/main/main-founder-compressed.png" alt="founder" className="founder-photo-img mobile-desktop-photo" />}
            {shorterDesktopPhoto && <img srcSet="/assets/img/agency/1x/agency-founder-min.png, /assets/img/agency/2x/agency-founder-min.png 2x" src="/assets/img/agency/1x/agency-founder-min.png" alt="founder" className="founder-photo-img mobile-desktop-photo" />}
            <img src="/assets/img/main/main-founder-tablet-compressed.png" alt="founder" className="founder-photo-img tablet-photo" />
            {/*<img src="/assets/img/main/main-founder-mobile-compressed.jpg" alt="founder" className="founder-photo-img mobile-photo" />*/}
          </div>
          <div className="founder-desc-block">
            <p className="blue-text increased-text">
              Соблюдение всех условий контракта по трудоустройству хоккеистов за границу — это&nbsp;моя&nbsp;личная&nbsp;гарантия и&nbsp;ответственность
            </p>
            <p>Международный хоккейный агент</p>
            <p>В рекрутинге с 2015 года</p>
            <p>Официальный партнер 19 хоккейных клубов США и Канады</p>
            <p>Выступал за команды:</p>
            <ul className="team-list">
              <li className="team-list-item">— Greater Metro Jr.A Hockey League, Канада</li>
              <li className="team-list-item">— Молодежной Хоккейной Лиги, Россия</li>
              <li className="team-list-item">— Высшей Хоккейной Лиги, Россия</li>
            </ul>
            <p>Сооснователь и тренер школы хоккейного мастерства Z‑Hockey</p>
            <p>Преподаватель кафедры менеджмента по спортивным направлениям в Финансовом университете при Правительстве Российской Федерации</p>
            {withDetailsBtn && (
              <Link href="/agency"><a className="ui-button ui-button-transparent">Подробнее</a></Link>
            )}
            {/*<Link href="/agency?section=founder" scroll={false}><a className="ui-button ui-button-transparent">Подробнее</a></Link>*/}
          </div>
        </div>
      </div>
    </section>
  );
}

FounderSection.propTypes = {
  initialSlide: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  withDetailsBtn: PropTypes.bool,
};

FounderSection.defaultProps = {
  initialSlide: 0,
  withDetailsBtn: false,
};

export default memo(FounderSection);
