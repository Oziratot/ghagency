import { useRouter } from 'next/router';
import React, { memo, useCallback, useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import useFullHeight from '../../utils/hooks/useFullHeight';
// import BookButton from '../Button/BookButton';
import OrderCallButton from '../Button/OrderCallButton';
import FixedCarousel from '../FixedCarousel';
import { ContactFormModalContext } from '../Root/Root';
import { HeroSlide1, HeroSlide4 } from './slides';
import classnames from 'classnames';

const heroSectionSlides = [
  HeroSlide1,
  HeroSlide4,
  // { id: 2, title: 'Просмотровый лагерь<br/>для&nbsp;юниоров&nbsp;в&nbsp;Канаде', desc: '<img src="/assets/img/hero/logo-nhl.png" /><span>Торонто,<br/>27 июля — 24 августа</span>', link: '/' },
  // { id: 3, title: 'Просмотровый турнир<br/>в&nbsp;хоккейные&nbsp;лиги<br/>Северной&nbsp;Америки', desc: 'Москва,<br/>4-7 мая 2020', link: '/' },
];

function HeroSliderSection({ initialSlide, slides }) {
  const [slide, setSlide] = useState(initialSlide);
  const height = useFullHeight();
  const fullScreenSliderWrapRef = useRef(null);
  const formModalContext = useContext(ContactFormModalContext);
  const router = useRouter();

  const onSlideClick = useCallback((e) => {
    const id = e.currentTarget.dataset?.id;

    switch (id) {
      case '1':
      default:
        formModalContext.setModalShown(true);
        break;
      case '2':
        router.push('/services/training-camps');
        break;
      case '4':
        router.push('/services/player-viewing/2022');
        break;
    }
  }, []);

  return (
    <section className="section section-hero-slider" style={{ height }}>
      <div className="full-screen-slider" ref={fullScreenSliderWrapRef}>
        <FixedCarousel value={slide} onChange={setSlide} animationSpeed={500} autoPlay={slides.length > 1 ? 4500 : undefined} infinite={slides.length > 1} dots={slides.length > 1}>
          {slides.map(({ id, title, desc, link }) => (
            <div className={classnames(`slide-content slide-${id}`, { main: router.pathname === '/' })} key={id} onClick={onSlideClick} data-id={id}>
              <div className="container">
                <div className="hero-slide-wrap">
                  {id === 5 && <p className="section-title">Москва, ЛД&nbsp;«Морозово» 6–18&nbsp;июня</p>}
                  <p className={`h2 slide-title slide-title-${id}`} dangerouslySetInnerHTML={{ __html: title }} />
                  <p className="slide-text" dangerouslySetInnerHTML={{ __html: desc }} />
                  {id === 1 && <OrderCallButton>Заказать</OrderCallButton>}
                  {id === 4 && router.pathname !== '/services/player-viewing/2022' && <Link href={link}><a className="ui-button ui-button-orange">Подробнее</a></Link>}
                  {id === 4 && router.pathname === '/services/player-viewing/2022' && <OrderCallButton modalTitle="Запишитесь на просмотр" firstSubmitLabel="Записаться" secondSubmitLabel="Записаться">Забронировать</OrderCallButton>}
                  {id === 5 && <OrderCallButton modalTitle="Запишитесь на просмотр" firstSubmitLabel="Записаться" secondSubmitLabel="Записаться">Записаться</OrderCallButton>}
                  {id !== 1 && id !== 4 && id !== 5 && <Link href={link}><a className="ui-button ui-button-orange">Подробнее</a></Link>}
                  {id === 5 && <p className="note">*Регистрация до&nbsp;6&nbsp;июня</p> }
                </div>
              </div>
            </div>
          ))}
        </FixedCarousel>
      </div>
    </section>
  );
}

HeroSliderSection.propTypes = {
  initialSlide: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  slides: PropTypes.array,
};

HeroSliderSection.defaultProps = {
  initialSlide: 0,
  slides: heroSectionSlides,
};

export default memo(HeroSliderSection);
