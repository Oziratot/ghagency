import React, {
  forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import classnames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Head from '../../components/Head';
import PageServices from '../../components/PageServices';
import HeroSliderSection from '../../components/HeroSliderSection/HeroSliderSection';
import { HeroSlide4, HeroSlide5 } from '../../components/HeroSliderSection/slides';
import Breadcrumbs from '../../components/Breadcrumbs';
import Collapse from '../../components/Collapse';
import CollapsePanel from '../../components/Collapse/CollapsePanel';
import DoubleArrowDownIcon from '../../assets/svg/double-arrow-down.svg';
import MultipleItemsSlider from '../../components/MultipleItemsSlider/MultipleItemsSlider';
import OrderCallButton from '../../components/Button/OrderCallButton';
import PhotoSlider from '../../components/PhotoSlider/PhotoSlider';
import FeedbackSection from '../../components/FeedbackSection/FeedbackSection';
import useContactsMap from '../../utils/hooks/useContactsMap';
import VideoSlider from '../../components/VideoSlider/VideoSlider';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import CloseIcon from '../../assets/svg/close-btn-new.svg'

const about = [
  { src: '/assets/img/services/camp-2022/about-1.png', text: '16&nbsp;полевых игроков<br />и&nbsp;3&nbsp;вратаря' },
  { src: '/assets/img/services/camp-2022/about-2.png', text: 'Наигрываем звенья<br />и&nbsp;сочетания к&nbsp;просмотру' },
  { src: '/assets/img/services/camp-2022/about-3.png', text: 'Корректировка<br />двигательных стереотипов<br />на&nbsp;земле с&nbsp;кинезиологом' },
  { src: '/assets/img/services/camp-2022/about-4.png', text: 'Работа с&nbsp;травмами<br />и&nbsp;быстрый вход игрока<br />в&nbsp;форму' },
];

const coaches = [
  { name: 'Илья Винокуров', photo: '/assets/img/services/camp-2022/coaches/coach-1.jpg', desc: '• Тренер по&nbsp;ледовой подготовке<br />• Тренерский стаж с&nbsp;2019&nbsp;года<br />• Высшее педагогическое образование НГГУ, специальность «Физическая Культура и&nbsp;Спорт»<br />• Специалист по&nbsp;технической подготовке на&nbsp;льду<br />• Работал с&nbsp;хоккеистами высших молодёжных и&nbsp;профессиональных лиг&nbsp;США, Канады и&nbsp;Европы.' },
  // { name: 'Егор Гришатов', photo: '/assets/img/services/camp-2022/coaches/coach-2.jpg', desc: '• Тренер по&nbsp;ледовой подготовке<br />• Тренерский стаж с&nbsp;2016&nbsp;года<br />• Высшее педагогическое образование РГСУ, специальность «Физическая культура и&nbsp;спорт»<br />• Основатель спортивной школы Grishatov Hockey<br />• Основатель хоккейного агентства Grishatov Hockey Agency.' },
  { name: 'Дмитрий Михин', photo: '/assets/img/services/camp-2022/coaches/coach-3.jpg', desc: '• Тренер по&nbsp;ледовой подготовке<br />• Тренерский стаж с&nbsp;2014&nbsp;года<br />• Высшее педагогическое образование РГУФКСМиТ, специальность «Тренер по&nbsp;хоккею с&nbsp;шайбой»<br />• Специалист по&nbsp;технической и&nbsp;функциональной подготовке на&nbsp;льду<br />• Работал с&nbsp;хоккеистами высших молодёжных и&nbsp;профессиональных лиг&nbsp;США, Канады и&nbsp;Европы.' },
  { name: 'Александр Юрин', photo: '/assets/img/services/camp-2022/coaches/coach-4.jpg', desc: '• Тренер по&nbsp;физической подготовке<br />• Тренерский стаж с&nbsp;2008&nbsp;года<br />• Образование National Academy of Sport Medicine USA<br />• Специалист по&nbsp;функциональной подготовке и&nbsp;ортопедическому контролю спортсменов<br />• Основатель спортивного центра диагностики, коррекции и&nbsp;восстановления D.R.E.A.M.' },
  // { name: 'Олег Гришатов', photo: '/assets/img/services/camp-2022/coaches/coach-5.jpg', desc: '• Тренер по&nbsp;физической подготовке<br />• Действующий игрок канадской команды Lakehead University, USport<br />• Лучший защитник канадской команды Bradford Rattlers, GMHL в&nbsp;сезоне 19–20&nbsp;и&nbsp;21–22<br />• Сертифицированный тренер американской ассоциации NSCA по&nbsp;направлению STRENGTH AND CONDITIONING SPECIALIST (CSCS).' },
];

const view2021 = [
  { src: '/assets/img/services/camp-2022/2021/camp-1.jpg' },
  { src: '/assets/img/services/camp-2022/2021/camp-2.jpg' },
  { src: '/assets/img/services/camp-2022/2021/camp-3.jpg' },
  { src: '/assets/img/services/camp-2022/2021/camp-4.jpg' },
  { src: '/assets/img/services/camp-2022/2021/camp-5.jpg' },
  { src: '/assets/img/services/camp-2022/2021/camp-6.jpg' },
  { src: '/assets/img/services/camp-2022/2021/camp-7.jpg' },
  { src: '/assets/img/services/camp-2022/2021/camp-8.jpg' },
  { src: '/assets/img/services/camp-2022/2021/camp-9.jpg' },
  { src: '/assets/img/services/camp-2022/2021/camp-10.jpg' },
  { src: '/assets/img/services/camp-2022/2021/camp-11.jpg' },
  { src: '/assets/img/services/camp-2022/2021/camp-12.jpg' },
  { src: '/assets/img/services/camp-2022/2021/camp-13.jpg' },
  { src: '/assets/img/services/camp-2022/2021/camp-14.jpg' },
  { src: '/assets/img/services/camp-2022/2021/camp-15.jpg' },
  { src: '/assets/img/services/camp-2022/2021/camp-16.jpg' },
];

const modalSchedule = [
  { date: 'Понедельник', ground: '13:30 – 14:45&nbsp;земля', ice: '15:15 – 16:30&nbsp;лёд' },
  { date: 'Вторник', ground: '13:45 – 15:00&nbsp;земля', ice: '15:30 – 16:45&nbsp;лёд' },
  { date: 'Среда', ground: '13:15 – 14:30&nbsp;земля', ice: '15:00 – 16:15&nbsp;лёд' },
  { date: 'Четверг', ground: '13:45 – 15:00&nbsp;земля', ice: '15:30 – 16:45&nbsp;лёд' },
  { date: 'Пятница', ground: '13:15 – 14:30&nbsp;земля', ice: '15:00 – 16:15&nbsp;лёд' },
  { date: 'Суббота', ground: '15:30 – 17:00&nbsp;игра', ice: '17:15 – 19:15&nbsp;баня' },
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
            "@id": "https://ghockeyagency.ru/services/training-camp-2022",
            "name": "Тренировочный лагерь для хоккеистов"
          }
        }
      ]
    }
  `,
};

const heroSlides = [HeroSlide5];

const CustomA = forwardRef(({ className, children, onClick, href }, ref) => {
  const handleClick = useCallback((e) => {
    e.stopPropagation();
    onClick(e);
  }, [onClick]);

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
});

const ClientSideRender = memo(({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? children : null;
});

const video = [{ videoId: 'qXvKcp0tSrE' }];

function TrainingCamp2022() {
  const [desktopScoutsVisibleNumber, setDesktopScoutsVisibleNumber] = useState(3);
  const [activeScoutPanels, setActiveScoutPanels] = useState([]);
  const [scheduleActive, setScheduleActive] = useState(false);
  const handleScoutsShowAllClick = useCallback(() => setDesktopScoutsVisibleNumber(coaches.length), []);
  const toggleScheduleModal = useCallback(() => setScheduleActive((prev) => !prev), []);
  const [photos2020, setPhotos2020] = useState(view2021);
  const [activeFaqItems, setActiveFaqItems] = useState({ 0: true });
  const mapRef = useRef();
  useContactsMap(mapRef, true);

  const faq = useMemo(() => ([
    {
      question: 'Входит&nbsp;ли&nbsp;проживание и&nbsp;питание в&nbsp;стоимость лагеря?',
      answer: (<>Нет, не&nbsp;входит. Игроки самостоятельно обеспечивают себя проживанием и&nbsp;питанием на&nbsp;время проведения лагеря. В&nbsp;шаговой доступности от&nbsp;ледового находится большое количество гостиниц и&nbsp;мест питания.</>),
    },
    {
      question: 'Можно&nbsp;ли&nbsp;оставлять форму на&nbsp;ледовой арене во&nbsp;время лагеря?',
      answer: (<>Да, на&nbsp;ледовой арене есть&nbsp;возможность хранения и&nbsp;стирки экипировки&nbsp;— это&nbsp;платная услуга, стоимость уточняйте у&nbsp;администрации ледового комплекса.</>),
    },
    {
      question: 'Экзамен в один из тренировочных дней, как быть?',
      answer: (<>Вы&nbsp;также&nbsp;можете принять участие в&nbsp;подготовительном лагере&nbsp;— пропуск 1–2&nbsp;дней не&nbsp;критичен для&nbsp;набора формы.</>),
    },
  ]), []);

  return (
    <>
      <Head
        title="Предпросмотровый хоккейный лагерь 2022 | хоккейное агентство «GHA»"
        desc="Хоккейное агентство Гришатова ежегодно организовывает просмотровые турниры в Москве и отправляет игроков на крупнейшие просмотровые мероприятия за границу. Участие в турнирах — это реальная возможность быть замеченным и пройти отбор в лучшие команды США и Канады."
        page="/services/player-viewing/training-camp-2022"
        breadcrumbsData={BreadcrumbListStructuredData}
      />
      <PageServices subPageKey="training-camp-2022">
        <HeroSliderSection initialSlide={1} slides={heroSlides} />
        <section className="section section-event-details">
          <div className="container">
            <div className="event-wrap">
              <div className="event-title">100%</div>
              <div className="event-text">Все&nbsp;участники лагеря 2021&nbsp;получили приглашения<br />в&nbsp;зарубежные команды после&nbsp;просмотра</div>
            </div>
          </div>
        </section>

        <section className="section section-about-camp" id="about-camp-2022">
          <div className="container">
            <div className="about-content">
              <Breadcrumbs />
              <h1 className="h2 section-title">О лагере</h1>
              <div className="about-wrap">
                <ul className="about">
                  {about.map((item) => (
                    <div className="about-item" key={item.text}>
                      <img className="about-img" src={item.src} alt="icon" />
                      <div className="about-text" dangerouslySetInnerHTML={{ __html: item.text }} />
                    </div>
                  ))}
                </ul>
              </div>
              <VideoSlider className="camp-video" player items={video} />
            </div>
          </div>
        </section>

        <section className="section section-scouts" id="scouts">
          <div className="container">
            <h2 className="h2 section-title with-overflow coaches">Тренеры</h2>
            <ul className="scouts-list hidden-xs">
              <TransitionGroup component={null}>
                {coaches.slice(0, desktopScoutsVisibleNumber).map(({ name, photo, desc }) => (
                  <CSSTransition
                    key={name}
                    timeout={450}
                    classNames="scouts-list-item"
                  >
                    <li className="scouts-list-item">
                      <div className="scouts-list-item-content">
                        <img className="scout-photo" src={photo} alt="" />
                        <div className="scout-name" dangerouslySetInnerHTML={{ __html: name }} />
                        <Collapse activePanels={activeScoutPanels} onChange={setActiveScoutPanels}>
                          <CollapsePanel id={name} className="collapsible-scout-desc" expandBtnLabel="Подробнее" collapseBtnLabel="Подробнее" mobileHeight={144} desktopHeight={144}>
                            <div className="scout-desc" dangerouslySetInnerHTML={{ __html: desc }} />
                          </CollapsePanel>
                        </Collapse>
                      </div>
                    </li>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </ul>
            <CSSTransition in={desktopScoutsVisibleNumber < coaches.length} classNames="show-more-block" timeout={300} unmountOnExit>
              <div className="show-more-block hidden-xs">
                <button className="show-more-btn" type="button" onClick={handleScoutsShowAllClick}>Показать всех</button>
                <DoubleArrowDownIcon className="show-more-icon" onClick={handleScoutsShowAllClick} />
              </div>
            </CSSTransition>

            <div className="scouts-list-mobile visible-xs">
              <MultipleItemsSlider className="scouts-slider">
                {coaches.map(({ name, photo, desc }) => (
                  <div className="scouts-list-item" key={`mobile-scout-${name}`}>
                    <ClientSideRender>
                      <div className="scouts-list-item-content">
                        <img className="scout-photo" src={photo} alt="item" />
                        <div className="scout-name" dangerouslySetInnerHTML={{ __html: name }} />
                        <Collapse activePanels={activeScoutPanels} onChange={setActiveScoutPanels}>
                          <CollapsePanel id={name} className="collapsible-scout-desc" expandBtnLabel="Подробнее" collapseBtnLabel="Подробнее" mobileHeight={144} desktopHeight={144}>
                            <div className="scout-desc" dangerouslySetInnerHTML={{ __html: desc }} />
                          </CollapsePanel>
                        </Collapse>
                      </div>
                    </ClientSideRender>
                  </div>
                ))}
              </MultipleItemsSlider>
            </div>
          </div>
        </section>

        <section className="section section-extra-services">
          <div className="container">
            <h2 className="h2 section-title">Расписание тренировок</h2>
            <ul className="extra-services-list">
              <li className="extra-services-list-item">
                <div className="extra-service">
                  <div className="extra-service-image">
                    <img src="/assets/img/services/camp-2022/extra/schedule.jpg" alt="Будни" />
                  </div>
                  <div className="extra-service-info">
                    <div className="extra-service-name section-title">Понедельник — пятница</div>
                    <div className="extra-service-desc">• 1&nbsp;час&nbsp;15&nbsp;минут лёд<br />• 1&nbsp;час&nbsp;15&nbsp;минут земля</div>
                  </div>
                </div>
              </li>
              <li className="extra-services-list-item">
                <div className="extra-service">
                  <div className="extra-service-image">
                    <img src="/assets/img/services/camp-2022/extra/schedule-2.jpg" alt="Суббота" />
                  </div>
                  <div className="extra-service-info">
                    <div className="extra-service-name section-title">Суббота</div>
                    <div className="extra-service-desc">• 1 час 30 минут игра<br />• Восстанавливающая баня</div>
                  </div>
                </div>
              </li>
            </ul>
            <Button className="schedule-button" onClick={toggleScheduleModal}>Смотреть расписание</Button>
          </div>
        </section>

        <section className="section section-price">
          <div className="container">
            <h2 className="h2 section-title">Стоимость лагеря</h2>
            <div className="price-desc-blocks">
              <div className="price-desc-block">
                <div className="price-includes-duration">Лагерь на 6 дней</div>
                <div className="price-includes-dates">13–18 июня</div>
                <p className="price-includes-title">В&nbsp;стоимость включено:</p>
                <ul className="price-includes-list">
                  <li className="price-includes-list-item">—&nbsp;5&nbsp;тренировочных и&nbsp;1&nbsp;игровой день</li>
                  <li className="price-includes-list-item">—&nbsp;2&nbsp;тренировки в&nbsp;день</li>
                  <li className="price-includes-list-item">—&nbsp;Игра в&nbsp;субботу</li>
                  <li className="price-includes-list-item">—&nbsp;Баня после&nbsp;игры</li>
                  <li className="price-includes-list-item">—&nbsp;Тренировочная майка и&nbsp;гамаши</li>
                  <li className="price-includes-list-item">—&nbsp;Гели и&nbsp;шампуни для&nbsp;душа</li>
                  <li className="price-includes-list-item">—&nbsp;Вода, напитки, изотоники</li>
                  <li className="price-includes-list-item">—&nbsp;Заточка коньков</li>
                  <li className="price-includes-list-item">—&nbsp;Скотч и&nbsp;лента</li>
                  <li className="price-includes-list-item">—&nbsp;Тренировочная памятка</li>
                  <li className="price-includes-list-item">—&nbsp;Консультация кинезиолога</li>
                </ul>
                <div className="price-amounts">
                  <div className="current-price">29 900&nbsp;₽</div>
                  {/*<div className="later-price">с&nbsp;1&nbsp;апреля&nbsp;—  29 900&nbsp;₽</div>*/}
                  <OrderCallButton modalTitle="Запишитесь на просмотр" firstSubmitLabel="Записаться" secondSubmitLabel="Записаться">Забронировать</OrderCallButton>
                </div>
              </div>
              <div className="price-desc-block">
                <div className="price-includes-duration">Лагерь на 12 дней</div>
                <div className="price-includes-dates">6–18 июня</div>
                <p className="price-includes-title">В&nbsp;стоимость включено:</p>
                <ul className="price-includes-list">
                  <li className="price-includes-list-item">—&nbsp;10&nbsp;тренировочных и&nbsp;2&nbsp;игровых дня</li>
                  <li className="price-includes-list-item">—&nbsp;2&nbsp;тренировки в&nbsp;день</li>
                  <li className="price-includes-list-item">—&nbsp;Игры в&nbsp;субботу</li>
                  <li className="price-includes-list-item">—&nbsp;Баня после&nbsp;игр</li>
                  <li className="price-includes-list-item">—&nbsp;Тренировочная майка и&nbsp;гамаши</li>
                  <li className="price-includes-list-item">—&nbsp;Гели и&nbsp;шампуни для&nbsp;душа</li>
                  <li className="price-includes-list-item">—&nbsp;Вода, напитки, изотоники</li>
                  <li className="price-includes-list-item">—&nbsp;Заточка коньков</li>
                  <li className="price-includes-list-item">—&nbsp;Скотч и&nbsp;лента</li>
                  <li className="price-includes-list-item">—&nbsp;Тренировочная памятка</li>
                  <li className="price-includes-list-item">—&nbsp;Консультация кинезиолога</li>
                </ul>
                <div className="price-amounts">
                  <div className="current-price">49 900&nbsp;₽</div>
                  {/*<div className="later-price">с&nbsp;1&nbsp;апреля&nbsp;—  29 900&nbsp;₽</div>*/}
                  <OrderCallButton modalTitle="Запишитесь на просмотр" firstSubmitLabel="Записаться" secondSubmitLabel="Записаться">Забронировать</OrderCallButton>
                </div>
              </div>
            </div>
            <p className="participation-condition">Участие после&nbsp;подтверждения заявки на&nbsp;условиях 100% оплаты по&nbsp;договору</p>
          </div>
        </section>

        <section className="section section-last-view">
          <h2 className="h2 section-title with-overflow">Фотографии лагеря 2021</h2>
          <PhotoSlider className="last-view-slider" items={photos2020} albumTitle="Просмотр 2020" />
        </section>

        <section className="section section-faq">
          <div className="faq-block">
            <h2 className="h2 section-title">Ответы на часто задаваемые вопросы</h2>
            <ul className="faq-list">
              {faq.map(({ question, answer }, i) => (
                <li
                  key={question}
                  className={classnames('faq-list-item', { _active: activeFaqItems[i] })}
                  onClick={() => setActiveFaqItems((prevState) => ({ ...prevState, [i]: !prevState[i] }))}
                >
                  <div className="faq-icon" />
                  <div className="faq-question" dangerouslySetInnerHTML={{ __html: question }} />
                  <div className="faq-answer">
                    <div className="faq-answer-content">
                      {answer}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section section-address" id="address">
          <h2 className="h2 section-title">Ледовая арена «Морозово»</h2>
          <div className="event-address"><span className="hidden-xs">Москва, </span>ул.&nbsp;Новоостаповская, д.&nbsp;5, с.&nbsp;2</div>
          <div className="map-container">
            <div className="static-map" ref={mapRef} />
          </div>
        </section>

        <FeedbackSection title="Узнать больше о&nbsp;предпросмотровом лагере" subtitle="Оставьте контакт, мы перезвоним и ответим на все вопросы" firstSubmitLabel="Отправить">
          <div className="founder-block">
            <img className="hidden-xs founder-photo" src="/assets/img/founder-circle-small-photo.png" alt="Егор Гришатов - Руководитель хоккейного агентства GHA" />
            <img className="visible-xs founder-photo" src="/assets/img/founder-circle-small-photo-mobile.png" alt="Егор Гришатов - Руководитель хоккейного агентства GHA" />
            <div className="founder-desc">
              <div className="founder-position">Егор Гришатов — основатель хоккейного агентства GHA, международный хоккейный агент, официальный партнер 19&nbsp;хоккейных клубов&nbsp;США, Канады&nbsp;и&nbsp;Европы</div>
            </div>
          </div>
        </FeedbackSection>

        <Modal className="schedule-modal" onClose={toggleScheduleModal} active={scheduleActive}>
          <img className="schedule-image hidden-xs" src="/assets/img/services/camp-2022/schedule.png" alt="Игрок на поле" />
          <img className="schedule-image visible-xs" src="/assets/img/services/camp-2022/schedule-mobile.png" alt="Игрок на поле" />
          <div className="schedule-container">
            <h2 className="h2 section-title">Расписание тренировок</h2>
            <ul className="schedule">
              {modalSchedule.map((item) => (
                <div className="schedule-item">
                  <p className="schedule-date">{item.date}</p>
                  <div className="schedule-text" dangerouslySetInnerHTML={{ __html: item.ground }} />
                  <div className="schedule-text" dangerouslySetInnerHTML={{ __html: item.ice }} />
                </div>
              ))}
            </ul>
          </div>
          <CloseIcon onClick={toggleScheduleModal} className="new-close-btn" />
        </Modal>

      </PageServices>
    </>
  );
}

export default TrainingCamp2022;
