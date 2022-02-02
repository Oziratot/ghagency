import React, { forwardRef, memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DoubleArrowDownIcon from '../../../assets/svg/double-arrow-down.svg';
import Breadcrumbs from '../../../components/Breadcrumbs';
import OrderCallButton from '../../../components/Button/OrderCallButton';
import Collapse from '../../../components/Collapse';
import CollapsePanel from '../../../components/Collapse/CollapsePanel';
import FeedbackSection from '../../../components/FeedbackSection/FeedbackSection';
import Head from '../../../components/Head';
import HeroSliderSection from '../../../components/HeroSliderSection';
import { HeroSlide4 } from '../../../components/HeroSliderSection/slides';
import Modal from '../../../components/Modal';
import MultipleItemsSlider from '../../../components/MultipleItemsSlider/MultipleItemsSlider';
import PageServices from '../../../components/PageServices';
import PhotoSlider from '../../../components/PhotoSlider';
import { ContactFormModalContext } from '../../../components/Root/Root';
import { VIEWS } from '../../../constants/views';
import { animate, quad } from '../../../utils/animations';
import { getCoords } from '../../../utils/getCoords';
import { getScrollY } from '../../../utils/getScroll';
import useContactsMap from '../../../utils/hooks/useContactsMap';

import MapPointIcon from '../../../assets/svg/services/player-viewing/2021/map-point.svg';
import ExtraServiceVideoPros1Icon from '../../../assets/svg/services/player-viewing/2021/extra-service-video-1.svg';
import ExtraServiceVideoPros2Icon from '../../../assets/svg/services/player-viewing/2021/extra-service-video-2.svg';
import ExtraServiceVideoPros3Icon from '../../../assets/svg/services/player-viewing/2021/extra-service-video-3.svg';
import CloseExtraServiceModalIcon from '../../../assets/svg/services/player-viewing/2021/close-modal.svg';

const details = [
  { id: '3-days-3-games', value: '3', label: 'Игры за&nbsp;3&nbsp;дня' },
  { id: 'scouts', value: '11', label: 'Скаутов' },
  { id: '50-usa-and-europe-teams', value: '50+', label: 'Команд США, Канады&nbsp;и&nbsp;Европы' },
  { id: 'address', value: <MapPointIcon />, label: 'Москва ЛД&nbsp;«Морозово»' },
];

const scouts = [
  { name: 'Коди Ганье', photo: '/assets/img/services/player-viewing/scouts/scout-1.jpg', desc: 'Ассистент главного тренера Northeast Generals NAHL, США<br />Скаут Northeast Generals U18 NAPHL, США<br />Главный тренер Northeast Generals U16 NAPHL и ECEL, США<br />Скаут Seahawks Hockey EHL, США<br />Скаут New England Knights NA3HL, США' },
  { name: 'Шон Уэрф', photo: '/assets/img/services/player-viewing/scouts/scout-2.jpg', desc: 'Генеральный менеджер Bradford Rattlers GMHL, Канада<br />Директор по хоккейным операциям South Muskoka Shield GMHL, Канада<br />Скаут The Hill Academy U16/U18 Prep CSSHLE и ECEL, Канада' },
  { name: 'Адам Бортоломей', photo: '/assets/img/services/player-viewing/scouts/scout-3.jpg', desc: 'Главный тренер Philadelphia Hockey Club USPHL Premier, США<br />Ассистент главного тренера Philadelphia Hockey Club NCDC, США' },
  { name: 'Марк Андре-Карон', photo: '/assets/img/services/player-viewing/scouts/scout-4.jpg', desc: 'Генеральный менеджер Ville-Marie Pirates GMHL, Канада' },
  { name: 'Дейв Буш', photo: '/assets/img/services/player-viewing/scouts/scout-5.jpg', desc: 'Скаут New Jersey Junior Titans NAHL, США<br />Скаут New Jersey 87\'s EHL, США' },
  { name: 'Джозеф Кэткарт', photo: '/assets/img/services/player-viewing/scouts/scout-6.jpg', desc: 'Главный тренер New Tecumseth Civics GMHL, Канада' },
  { name: 'Томас Гбур', photo: '/assets/img/services/player-viewing/scouts/scout-7.jpg', desc: 'Глава европейского хоккейного агентства GSA, Словакия' },
  { name: 'Ринат Омарбеков', photo: '/assets/img/services/player-viewing/scouts/scout-8.png', desc: 'Главный тренер Ястребы Уральск U20, Казахстан' },
  { name: 'Крис Вилк', photo: '/assets/img/services/player-viewing/scouts/scout-9.png', desc: 'Главный тренер Cleveland Barons U18 T1EHL, США' },
  { name: 'Боб Кроски', photo: '/assets/img/services/player-viewing/scouts/scout-10.png', desc: 'Главный тренер Cleveland Barons U15 T1EHL, США' },
  { name: 'Глен Кэмпбелл', photo: '/assets/img/services/player-viewing/scouts/scout-11.png', desc: 'Владелец Northumberland Stars GMHL, Канада' },
];

const teams = [
  { label: 'Northeast Generals NAHL,&nbsp;США' },
  { label: 'Bradford Rattlers GMHL,&nbsp;Канада' },
  { label: 'Philadelphia Hockey Club NCDC,&nbsp;США' },
  { label: 'Ville-Marie Pirates GMHL,&nbsp;Канада' },
  { label: 'New Jersey Junior Titans NAHL,&nbsp;США' },
  { label: 'New Tecumseth Civics GMHL,&nbsp;Канада' },
  { label: 'Cleveland Barons U15/U16/U18&nbsp;T1EHL,&nbsp;США' },
  { label: 'South Muskoka Shield GMHL,&nbsp;Канада' },
  { label: 'The Hill Academy U16/U18&nbsp;Prep CSSHLE и&nbsp;ECEL, Канада и&nbsp;США' },
  { label: 'Seahawks Hockey EHL,&nbsp;США' },
  { label: 'New England Knights NA3HL,&nbsp;США' },
  { label: 'New Jersey 87\'s EHL,&nbsp;США' },
  { label: 'Okanagan Hockey Ontario U16/U18&nbsp;CSSHLE, Канада' },
  { label: 'Northeast Generals NA3HL,&nbsp;США' },
  { label: 'Philadelphia Hockey Club USPHL Premier,&nbsp;США' },
  { label: 'Kalix HC U18/U20, Швеция' },
  { label: 'Nynäshamns IF U18/U20, Швеция' },
  { label: 'Grästorps IK U18/U20, Швеция' },
  { label: 'Leksands IF U18/U20, Швеция' },
  { label: 'Malmo Redhawks U18/U20, Швеция' },
  { label: 'HC Sparta Praha U17/U20, Чехия' },
  { label: 'BC Mlada Boleslav U17/U20, Чехия' },
  { label: 'HC Kometa Brno U17/U20, Чехия' },
  { label: 'MHC Martin U18/U20, Словакия' },
  { label: 'HK Spisska Nova Ves U16/U18, Словакия' },
  { label: 'HKM Zvolen U16/U18/U20, Словакия' },
  { label: 'HK Nitra U16/U18/U20, Словакия' },
  { label: 'HK Michalovce U16/U18/U20, Словакия' },
  { label: 'Dukla Trencin U16/U18/U20, Словакия' },
  { label: 'HK Skalica U16/U18/U20, Словакия' },
  { label: 'ŠHK 37 Piestany U20&nbsp;2, Словакия' },
  { label: 'HK Ruzinov 99 U20&nbsp;2, Словакия' },
  { label: 'Pesterzsébeti Farkasok U18/U21, Венгрия' },
  { label: 'Györi ETO HC U18/U21, Венгрия' },
  { label: 'Vasas SC U18/U21, Венгрия' },
  { label: 'Dunaujvaros AC U18/U21, Венгрия' },
  { label: 'KMH Budapest U18/U21, Венгрия' },
  { label: 'Meudon U20, Франция' },
  { label: 'Krefelder EV 1981 DNL&nbsp;U20, Германия' },
  { label: 'Iserlohner EC DNL U20&nbsp;2, Германия' },
  { label: 'Ястребы Уральск U20, Казахстан' },
  { label: 'Northumberland Stars GMHL, Канада' },
  { label: 'Northeast Generals U16/U18 NAPHL, США' },
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
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item":
          {
            "@id": "https://ghockeyagency.ru/services/player-viewing/2021",
            "name": "Просмотр 2021"
          }
        }
      ]
    }
  `,
};

const gameSchedule = [
  {
    title: 'Junior',
    content: [
      { title: '14 июня', content: [{ title: 'Желтые — Зеленые', content: '9:00–10:45' }, { title: 'Синие — Черные', content: '11:00–12:45' }] },
      { title: '15 июня', content: [{ title: 'Желтые — Черные', content: '9:00–10:45' }, { title: 'Зеленые — Синие', content: '11:00–12:45' }] },
      { title: '16 июня', content: [{ title: 'Желтые — Синие', content: '9:00–10:45' }, { title: 'Зеленые — Черные', content: '11:00–12:45' }] },
    ],
  },
  // {
  //   title: 'Junior B',
  //   content: [
  //     { title: '14 июня', content: [{ title: 'Синие — Зеленые', content: '13:00–14:45' }, { title: 'Золотые — Серые', content: '15:00–16:45' }] },
  //     { title: '15 июня', content: [{ title: 'Золотые — Синие', content: '13:00–14:45' }, { title: 'Серые — Зеленые', content: '15:00–16:45' }] },
  //     { title: '16 июня', content: [{ title: 'Синие — Серые', content: '13:00–14:45' }, { title: 'Зеленые — Золотые', content: '15:00–16:45' }] },
  //   ],
  // },
  {
    title: 'Kids',
    content: [
      { title: '14 июня', content: [{ title: 'Белые — Красные', content: '13:00–14:45' }] },
      { title: '15 июня', content: [{ title: 'Красные — Белые', content: '13:00–14:45' }] },
      { title: '16 июня', content: [{ title: 'Белые — Красные', content: '13:00–14:45' }] },
    ],
  },
];

const heroSlides = [HeroSlide4];

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

function PlayerViewing2021() {
  const formModalContext = useContext(ContactFormModalContext);
  const [mobileTeamsVisibleNumber, setMobileTeamsVisibleNumber] = useState(5);
  const [desktopScoutsVisibleNumber, setDesktopScoutsVisibleNumber] = useState(4);
  const [photos2020, setPhotos2020] = useState(view2020);
  const [activeScoutPanels, setActiveScoutPanels] = useState([]);
  const [activeScheduleMobilePanels, setActiveScheduleMobilePanels] = useState([]);
  const [activeFaqItems, setActiveFaqItems] = useState({ 0: true });
  const [hockeyCampModalActive, setHockeyCampModalActive] = useState(false);
  const [videoModalActive, setVideoModalActive] = useState(false);
  const mapRef = useRef();
  useContactsMap(mapRef, true);

  const handleHockeyCampModalOpen = useCallback(() => setHockeyCampModalActive(true), []);
  const handleVideoModalOpen = useCallback(() => setVideoModalActive(true), []);
  const handleHockeyCampModalClose = useCallback(() => setHockeyCampModalActive(false), []);
  const handleVideoModalClose = useCallback(() => setVideoModalActive(false), []);

  const handleContactFormOpen = useCallback((e) => {
    e.stopPropagation();
    formModalContext.setModalShown(true);
  }, []);

  const faq = useMemo(() => ([
    {
      question: 'Просмотр состоится?',
      answer: (<>Да, просмотр состоится в&nbsp;любом случае. В&nbsp;случае невозможности присутствия скаутов на&nbsp;просмотре в&nbsp;связи с&nbsp;эпидемиологической обстановкой в&nbsp;мире и&nbsp;закрытыми границами, просмотр пройдет в&nbsp;онлайн-формате.</>),
    },
    {
      question: 'Все&nbsp;заявленные скауты приедут?',
      answer: (<>Мы&nbsp;делаем все&nbsp;возможное для&nbsp;того, чтобы&nbsp;обеспечить личное присутствие каждого скаута на&nbsp;турнире. Тем&nbsp;не&nbsp;менее, коронавирусные ограничения могут повлиять на&nbsp;возможность пересечения границ в&nbsp;июне. В&nbsp;этом случае скауты будут отсматривать и&nbsp;оценивать игроков в&nbsp;онлайн-формате через&nbsp;прямую&nbsp;трансляцию матчей&nbsp;на&nbsp;YouTube.</>),
    },
    {
      question: 'Входит&nbsp;ли&nbsp;проживание и&nbsp;питание в&nbsp;стоимость просмотра?',
      answer: (<>Нет, не&nbsp;входит. Игроки самостоятельно обеспечивают себя проживанием и&nbsp;питанием на&nbsp;время проведения просмотра. В&nbsp;шаговой доступности от&nbsp;ледового находится большое количество гостиниц и&nbsp;мест&nbsp;питания.</>),
    },
    {
      question: 'Реально&nbsp;ли&nbsp;игроку уехать в&nbsp;зарубежные лиги после&nbsp;этого просмотра?',
      answer: (<>Да, реально. Наш&nbsp;просмотр&nbsp;— ежегодный, вы&nbsp;можете ознакомиться с&nbsp;результатами участников предыдущих лет&nbsp;в&nbsp;соответствующем разделе или&nbsp;на&nbsp;странице&nbsp;<Link href="/players" passHref><CustomA className="blue-link">Игроки</CustomA></Link>.</>),
    },
    {
      question: 'За&nbsp;чей&nbsp;счет осуществляется переезд в&nbsp;зарубежные клубы?',
      answer: (<>Игроки уровня национальной сборной могут рассчитывать на&nbsp;полное покрытие всех расходов на&nbsp;переезд в&nbsp;случае интереса со&nbsp;стороны высших молодежных лиг&nbsp;США, Канады и&nbsp;аффилированных с&nbsp;ними клубов&nbsp;НХЛ. Для&nbsp;остальных игроков переезд осуществляется полностью за&nbsp;свой счет. <br /><br />Подробнее об&nbsp;условиях переезда вы&nbsp;можете узнать, заказав <span className="blue-link" onClick={handleContactFormOpen}>бесплатную&nbsp;консультацию</span>.</>),
    },
    {
      question: 'Хоккеистам платят зарплаты в&nbsp;представленных клубах?',
      answer: (<>Игроки уровня национальной сборной, играющие на молодежном уровне в CHL или же игроки выступающие за профессиональные взрослые команды Европы могут рассчитывать на зарплату. В остальных случаях клубы уровня Tier I и Tier II (USHL и NAHL/NCDC соотв.) покрывают расходы игрока на тренировочный и игровой процесс и в некоторых случаях на&nbsp;проживание. <br /><br />Подробнее со структурой североамериканского хоккея вы можете ознакомиться в&nbsp;разделе&nbsp;<Link href="/blog" passHref><CustomA className="blue-link">Блог</CustomA></Link>.</>),
    },
    {
      question: 'Сколько стоит сезон в&nbsp;зарубежных лигах?',
      answer: (<>Для&nbsp;ответа на&nbsp;данный вопрос вы&nbsp;можете заказать бесплатную консультацию на&nbsp;нашем сайте. Финальная сумма зависит от&nbsp;множества факторов, более подробно о&nbsp;стоимости хоккея за&nbsp;рубежом вы&nbsp;можете узнать в&nbsp;разделе&nbsp;<Link href="/blog" passHref><CustomA className="blue-link">Блог</CustomA></Link>.</>),
    },
    {
      question: 'Можно&nbsp;ли&nbsp;оставлять форму на&nbsp;ледовой арене во&nbsp;время проведения подготовительного лагеря и&nbsp;самого просмотра?',
      answer: (<>Да, для&nbsp;участников подготовительного лагеря и&nbsp;просмотрового турнира будет выделена отдельная сушилка на&nbsp;территории ледового&nbsp;дворца.</>),
    },
  ]), []);

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
  }, []);

  const handleEventDetailsItemClick = useCallback((e) => {
    const id = e.currentTarget.dataset?.id;
    const scrollY = getScrollY();
    const sectionTop = getCoords(window.document.getElementById(id)).top;
    const headerOffset = window.document.getElementsByClassName('header')[0].offsetHeight - (window.innerWidth > 767 ? 33 : -25) - (id === '50-usa-and-europe-teams' && window.innerWidth > 767 ? 59 : 25) + (window.document.getElementsByClassName('ui-alert-machine')[0]?.offsetHeight ?? 0);
    animate({
      duration: 600,
      timing: quad,
      draw: (progress) => {
        window.scrollTo(0, scrollY + ((sectionTop - headerOffset - scrollY) * progress));
      },
    });
  }, []);

  const handleTeamsShowMoreClick = useCallback(() => {
    const newMobileTeamsVisibleNumber = mobileTeamsVisibleNumber + 19 > teams.length ? teams.length : mobileTeamsVisibleNumber + 19;
    setMobileTeamsVisibleNumber(newMobileTeamsVisibleNumber);
  }, [mobileTeamsVisibleNumber]);

  const handleScoutsShowAllClick = useCallback(() => setDesktopScoutsVisibleNumber(scouts.length), []);

  return (
    <>
      <Head
        title="Просмотр хоккеистов 2021 | хоккейное агентство «GHA»"
        desc="Хоккейное агентство Гришатова ежегодно организовывает просмотровые турниры в Москве и отправляет игроков на крупнейшие просмотровые мероприятия за границу. Участие в турнирах — это реальная возможность быть замеченным и пройти отбор в лучшие команды США и Канады."
        page="/services/player-viewing/2021"
        breadcrumbsData={BreadcrumbListStructuredData}
      />
      <PageServices subPageKey="player-viewing-2021">
        <HeroSliderSection initialSlide={1} slides={heroSlides} />
        <section className="section section-event-details">
          <div className="container">
            <ul className="event-details-list">
              {details.map(({ id, value, label }) => (
                <li className="event-details-list-item" key={label} data-id={id} onClick={handleEventDetailsItemClick}>
                  <div className="details-item-value">{value}</div>
                  <div className="details-item-label" dangerouslySetInnerHTML={{ __html: label }} />
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="section section-teams-selection" id="50-usa-and-europe-teams">
          <div className="container">
            <div className="teams-selection-content">
              <Breadcrumbs />
              <h1 className="h2 section-title">Отбор в&nbsp;хоккейные команды высших лиг&nbsp;США, Канады&nbsp;и&nbsp;Европы</h1>
              <ul className="teams-list hidden-xs">
                {teams.map(({ label }) => (
                  <li className="teams-list-item" key={label}>
                    <div className="teams-list-item-content" dangerouslySetInnerHTML={{ __html: label }} />
                  </li>
                ))}
              </ul>
              <ul className="teams-list visible-xs">
                <TransitionGroup component={null}>
                  {teams.slice(0, mobileTeamsVisibleNumber).map(({ label }) => (
                    <CSSTransition
                      key={label}
                      timeout={450}
                      classNames="teams-list-item"
                    >
                      <li className="teams-list-item">
                        <div className="teams-list-item-content" dangerouslySetInnerHTML={{ __html: label }} />
                      </li>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </ul>
              <CSSTransition in={mobileTeamsVisibleNumber < teams.length} classNames="show-more-block" timeout={300} unmountOnExit>
                <div className="show-more-block visible-xs">
                  <button className="show-more-btn" type="button" onClick={handleTeamsShowMoreClick}>Показать еще</button>
                  <DoubleArrowDownIcon className="show-more-icon" onClick={handleTeamsShowMoreClick} />
                </div>
              </CSSTransition>
            </div>
          </div>
          <img className="teams-img hidden-xs" src="/assets/img/services/player-viewing/2021/gha-view-2021-back-desktop.jpg" alt="Отбор в хоккейные команды высших лиг США, Канады и Европы" />
          <img className="teams-img visible-xs" src="/assets/img/services/player-viewing/2021/gha-view-2021-back-mobile.jpg" alt="Отбор в хоккейные команды высших лиг США, Канады и Европы" />
        </section>

        <section className="section section-scouts" id="scouts">
          <div className="container">
            <h2 className="h2 section-title">Скауты на просмотре</h2>
            <ul className="scouts-list hidden-xs">
              <TransitionGroup component={null}>
                {scouts.slice(0, desktopScoutsVisibleNumber).map(({ name, photo, desc }) => (
                  <CSSTransition
                    key={name}
                    timeout={450}
                    classNames="scouts-list-item"
                  >
                    <li className="scouts-list-item">
                      <div className="scouts-list-item-content">
                        <img className="scout-photo" src={photo} />
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
            <CSSTransition in={desktopScoutsVisibleNumber < scouts.length} classNames="show-more-block" timeout={300} unmountOnExit>
              <div className="show-more-block hidden-xs">
                <button className="show-more-btn" type="button" onClick={handleScoutsShowAllClick}>Показать всех</button>
                <DoubleArrowDownIcon className="show-more-icon" onClick={handleScoutsShowAllClick} />
              </div>
            </CSSTransition>

            <div className="scouts-list-mobile visible-xs">
              <MultipleItemsSlider className="scouts-slider">
                {scouts.map(({ name, photo, desc }) => (
                  <div className="scouts-list-item" key={`mobile-scout-${name}`}>
                    <ClientSideRender>
                      <div className="scouts-list-item-content">
                        <img className="scout-photo" src={photo} />
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

        <section className="section section-view-format">
          <h2 className="h2 section-title tablet-mobile-title">Формат просмотра</h2>
          <div className="section-illustration">
            <img className="hidden-xs" src="/assets/img/services/player-viewing/2021/gha-view-2021-format-desktop.jpg" alt="Формат просмотра GHA 2021" />
            <img className="visible-xs" src="/assets/img/services/player-viewing/2021/gha-view-2021-format-mobile.jpg" alt="Формат просмотра GHA 2021" />
          </div>
          <div className="section-content">
            <h2 className="h2 section-title desktop-title">Формат просмотра</h2>
            <div className="section-subtitle">Просмотр будет проходить по&nbsp;классической схеме североамериканских Tryout, 3&nbsp;игры за&nbsp;3&nbsp;дня</div>
            <div className="section-text">
              Подобный подход полностью соответствует критериям высших дивизионов североамериканского и европейского хоккея и&nbsp;применяется на&nbsp;просмотровых кэмпах и&nbsp;комбайн-турнирах USHL, NAHL, EHL и&nbsp;других&nbsp;лиг.
              <br /><br />—&nbsp;Участники просмотра будут разделены на&nbsp;8&nbsp;команд, 15&nbsp;полевых и&nbsp;2&nbsp;вратаря в&nbsp;каждой.
              <br /><br />—&nbsp;Каждая команда за&nbsp;время просмотра сыграет по&nbsp;3&nbsp;матча, 1&nbsp;матч против каждой команды своей группы.
              <br /><br />—&nbsp;Каждая игра 2&nbsp;периода по&nbsp;25&nbsp;минут чистого времени
            </div>
          </div>
        </section>

        <section className="section section-schedule">
          <div className="container">
            <h2 className="h2 section-title">Программа</h2>
            <div className="schedule-table">
              <div className="table-row">
                <div className="table-cell">13&nbsp;июня<br />14:00</div>
                <div className="table-cell">Конференция: «Хоккей в&nbsp;лигах Северной Америки и&nbsp;Европы: структура, организация, перспективы». Регистрация&nbsp;участников, ответы&nbsp;на&nbsp;вопросы. <br />Адрес проведения: Гостиница Holiday Inn Сокольники, Русаковская ул., 24</div>
              </div>
              <div className="table-row">
                <div className="table-cell">14–16&nbsp;июня</div>
                <div className="table-cell">Турнир</div>
              </div>
              <div className="table-row">
                <div className="table-cell">17&nbsp;июня</div>
                <div className="table-cell">Встреча с&nbsp;игроками и&nbsp;их&nbsp;родителями, индивидуальные разборы, заключение контрактов</div>
              </div>
            </div>
          </div>
          <img className="schedule-img hidden-xs" src="/assets/img/services/player-viewing/2021/gha-view-2021-team-desktop.jpg" alt="Игроки в майках GHA" />
          <img className="schedule-img visible-xs" src="/assets/img/services/player-viewing/2021/gha-view-2021-team-mobile.jpg" alt="Игроки в майках GHA" />
        </section>


        <section className="section section-game-schedule" id="3-days-3-games">
          <div className="container">
            <h2 className="h2 section-title">Расписание игр</h2>
            <div className="game-schedule-by-division hidden-xs">
              {gameSchedule.map((division) => (
                <div className="division-schedule" key={division.title}>
                  <div className="division-schedule-title">{division.title}</div>
                  <div className="division-schedule-content">
                    {division.content.map((day) => (
                      <div className="date-block" key={`${division.title}-${day.title}`}>
                        <div className="date-block-title">{day.title}</div>
                        <div className="date-block-content">
                          {day.content.map((game) => (
                            <div className="date-block-content-item" key={`${division.title}-${day.title}-${game.title}`}>
                              <div className="item-teams">{game.title}</div>
                              <div className="item-time">{game.content}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="game-schedule-by-division visible-xs">
              <Collapse activePanels={activeScheduleMobilePanels} onChange={setActiveScheduleMobilePanels}>
                {gameSchedule.map((division) => {
                  const id = division.title;
                  const handleDivisionClick = () => {
                    setActiveScheduleMobilePanels((prevState) => (
                      prevState.includes(id) ? prevState.filter((activeId) => activeId !== id) : [...prevState, id]
                    ));
                  };

                  return (
                    <div className="division-schedule" key={id} onClick={handleDivisionClick}>
                      <div className="division-schedule-title">{division.title}</div>
                      <CollapsePanel id={id} className="collapsible-schedule" expandBtnLabel={null} collapseBtnLabel={null} alwaysShowExpandBtn mobileHeight={0} desktopHeight={0}>
                        <div className="division-schedule-content">
                          {division.content.map((day) => (
                            <div className="date-block" key={`${division.title}-${day.title}`}>
                              <div className="date-block-title">{day.title}</div>
                              <div className="date-block-content">
                                {day.content.map((game) => (
                                  <div className="date-block-content-item" key={`${division.title}-${day.title}-${game.title}`}>
                                    <div className="item-teams">{game.title}</div>
                                    <div className="item-time">{game.content}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CollapsePanel>
                    </div>
                  );
                })}
              </Collapse>
            </div>
          </div>
        </section>

        <section className="section section-last-views-results">
          <div className="container">
            <h2 className="h2 section-title">Результаты игроков прошлых просмотров</h2>
            <MultipleItemsSlider className="last-views-slider" desktopArrows desktopDots={false}>
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
            </MultipleItemsSlider>
          </div>
        </section>


        <section className="section section-price">
          <div className="container">
            <h2 className="h2 section-title">Стоимость просмотра</h2>
            <p className="registration-ends">Регистрация заканчивается 20&nbsp;мая&nbsp;или&nbsp;раньше, после&nbsp;окончания свободных мест</p>
            <div className="price-desc-block">
              <p className="price-includes-title">В&nbsp;стоимость включено:</p>
              <ul className="price-includes-list">
                <li className="price-includes-list-item">—&nbsp;Конференция о&nbsp;структуре зарубежного хоккея 13&nbsp;июня</li>
                <li className="price-includes-list-item">—&nbsp;3&nbsp;просмотровые игры</li>
                <li className="price-includes-list-item">—&nbsp;Индивидуальный анализ и&nbsp;оценка игры от&nbsp;приглашенных специалистов</li>
                <li className="price-includes-list-item">—&nbsp;План развития игрока в&nbsp;личной консультации</li>
                <li className="price-includes-list-item">—&nbsp;Прямая трансляция на&nbsp;Youtube</li>
                <li className="price-includes-list-item">—&nbsp;Игровая майка и&nbsp;гамаши участника просмотра</li>
              </ul>
              <div className="price-amounts">
                <div className="current-price">29 900&nbsp;₽</div>
                {/*<div className="later-price">с&nbsp;1&nbsp;апреля&nbsp;—  29 900&nbsp;₽</div>*/}
                <OrderCallButton modalTitle="Запишитесь на просмотр" firstSubmitLabel="Записаться" secondSubmitLabel="Записаться">Забронировать</OrderCallButton>
              </div>
            </div>
            <p className="participation-condition">Участие после&nbsp;подтверждения заявки на&nbsp;условиях 100% оплаты по&nbsp;договору</p>
          </div>
        </section>

        <section className="section section-extra-services">
          <div className="container">
            <h2 className="h2 section-title">Дополнительно можно приобрести</h2>
            <ul className="extra-services-list">
              <li className="extra-services-list-item">
                <div className="extra-service" onClick={handleHockeyCampModalOpen}>
                  <div className="extra-service-image">
                    <img src="/assets/img/services/player-viewing/2021/extra-service-1.jpg" alt="Хоккейный лагерь" />
                  </div>
                  <div className="extra-service-info">
                    <div className="extra-service-name">Хоккейный лагерь</div>
                    <div className="extra-service-desc">7 июня&nbsp;—&nbsp;12&nbsp;июня<br />Москва,&nbsp;ЛД&nbsp;«Морозово»</div>
                    <div className="extra-service-price">22&nbsp;900&nbsp;₽</div>
                  </div>
                  <div className="details-link">Подробнее</div>
                </div>
              </li>
              <li className="extra-services-list-item">
                <div className="extra-service" onClick={handleVideoModalOpen}>
                  <div className="extra-service-image">
                    <img src="/assets/img/services/player-viewing/2021/extra-service-2.jpg" alt="Видеонарезка" />
                  </div>
                  <div className="extra-service-info">
                    <div className="extra-service-name">Видеонарезка</div>
                    <div className="extra-service-desc">Лучшие моменты игрока <br />для&nbsp;портфолио</div>
                    <div className="extra-service-price">4&nbsp;900&nbsp;₽</div>
                  </div>
                  <div className="details-link">Подробнее</div>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="section section-last-view">
          <h2 className="h2 section-title with-overflow">Фотографии просмотра 2020</h2>
          <PhotoSlider items={photos2020} albumTitle="Просмотр 2020" />
        </section>

        <section className="section section-address" id="address">
          <h2 className="h2 section-title">Ледовая арена «Морозово»</h2>
          <div className="event-address"><span className="hidden-xs">Москва, </span>ул.&nbsp;Новоостаповская, д.&nbsp;5, с.&nbsp;2</div>
          <div className="map-container">
            <div className="static-map" ref={mapRef} />
          </div>
        </section>

        <section className="section section-faq">
          <div className="faq-block">
            <h2 className="h2 section-title">Ответы на часто задаваемые вопросы</h2>
            <ul className="faq-list">
              {faq.map(({ question, answer }, i) => (
                <li
                  key={question}
                  className={classnames('faq-list-item', { _active: activeFaqItems[i] })}
                  onClick={() => setActiveFaqItems(prevState => ({ ...prevState, [i]: !prevState[i] }))}
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

        <FeedbackSection title="Задайте вопрос организатору просмотра" subtitle="Оставьте контакт, мы перезвоним и ответим на все вопросы" firstSubmitLabel="Отправить">
          <div className="founder-block">
            <img className="hidden-xs founder-photo" src="/assets/img/founder-circle-small-photo.png" alt="Егор Гришатов - Руководитель хоккейного агентства GHA" />
            <img className="visible-xs founder-photo" src="/assets/img/founder-circle-small-photo-mobile.png" alt="Егор Гришатов - Руководитель хоккейного агентства GHA" />
            <div className="founder-desc">
              <div className="founder-position">Егор Гришатов — основатель хоккейного агентства GHA, международный хоккейный агент, официальный партнер 19&nbsp;хоккейных клубов&nbsp;США, Канады&nbsp;и&nbsp;Европы</div>
            </div>
          </div>
        </FeedbackSection>
      </PageServices>
      <Modal
        className="extra-service-modal _service-camp"
        active={hockeyCampModalActive}
        closeIcon={CloseExtraServiceModalIcon}
        onClose={handleHockeyCampModalClose}
      >
        <div className="extra-service-illustration">
          <img className="hidden-xs-sm" src="/assets/img/services/player-viewing/2021/extra-service-illustration-1.jpg" alt="Дополнительно - хоккейный лагерь" />
          <img className="visible-xs-sm" src="/assets/img/services/player-viewing/2021/extra-service-illustration-1-mobile-tablet.jpg" alt="Дополнительно - хоккейный лагерь" />
        </div>
        <div className="extra-service-description">
          <div className="service-title section-title">Хоккейный лагерь</div>
          <div className="service-details">
            <div className="camp-info-block">
              <div className="camp-target">Только для&nbsp;участников просмотра 2002–2005&nbsp;г.р</div>
              <div className="camp-info">Интенсивная подготовка игроков к&nbsp;турниру на&nbsp;базе школы хоккея Z-Hockey</div>
              <div className="camp-dates">ДАТЫ: 7–12&nbsp;июня</div>
              <div className="camp-coaches-title">Тренеры школы Z-Hockey</div>
              <div className="camp-coaches">
                <div className="camp-coach">
                  <img className="camp-coach-photo" src="/assets/img/services/player-viewing/2021/extra-service-coach-zuev.png" alt="Тренер Виктор Зуев" />
                  <div className="camp-coach-name">Виктор Зуев</div>
                </div>
                <div className="camp-coach">
                  <div className="camp-coach-name">Павел Панков</div>
                  <img className="camp-coach-photo" src="/assets/img/services/player-viewing/2021/extra-service-coach-pankov.png" alt="Тренер Павел Панков" />
                </div>
              </div>
            </div>
            <div className="camp-schedule-block">
              <div className="camp-schedule-title">Расписание</div>
              <ul className="camp-schedule-list">
                <li className="camp-schedule-list-item">
                  <div className="item-title">Понедельник–Пятница</div>
                  <div className="item-content">
                    <div className="item-content-element">9:00–10:30&nbsp;лед</div>
                    <div className="item-content-element">10:50–12:20&nbsp;зал</div>
                  </div>
                </li>
                <li className="camp-schedule-list-item">
                  <div className="item-title">Суббота</div>
                  <div className="item-content">
                    <div className="item-content-element">10:30–12:00&nbsp;игра</div>
                    <div className="item-content-element">12:30–14:30&nbsp;баня</div>
                  </div>
                </li>
              </ul>
              <div className="camp-schedule-address">
                <div className="address-title">Адрес</div>
                <div className="address-content">лд&nbsp;«Морозово», ул.&nbsp;Новоастаповская, д.&nbsp;5&nbsp;с&nbsp;2</div>
              </div>
            </div>
          </div>
          <div className="service-price">
            <div className="service-price-title">Стоимость</div>
            <div className="service-price-value">22 900 ₽</div>
          </div>
        </div>
      </Modal>
      <Modal
        className="extra-service-modal _service-video"
        active={videoModalActive}
        closeIcon={CloseExtraServiceModalIcon}
        onClose={handleVideoModalClose}
      >
        <div className="extra-service-illustration">
          <img className="hidden-xs-sm" src="/assets/img/services/player-viewing/2021/extra-service-illustration-2.jpg" alt="Дополнительно - видеонарезка" />
          <img className="visible-xs-sm" src="/assets/img/services/player-viewing/2021/extra-service-illustration-2-mobile-tablet.jpg" alt="Дополнительно - видеонарезка" />
        </div>
        <div className="extra-service-description">
          <div className="service-title section-title">Видеонарезка</div>
          <div className="service-details">
            <ul className="video-pros-list">
              <li className="video-pros-list-item">
                <div className="pros-icon">
                  <ExtraServiceVideoPros1Icon />
                </div>
                <div className="pros-desc">
                  Ваши лучшие игровые моменты турнира длительностью от&nbsp;2&nbsp;до&nbsp;5&nbsp;минут
                </div>
              </li>
              <li className="video-pros-list-item">
                <div className="pros-icon">
                  <ExtraServiceVideoPros2Icon />
                </div>
                <div className="pros-desc">
                  Подсветка игрока специальными видеоэффектами и&nbsp;выделение его&nbsp;на&nbsp;общем фоне
                </div>
              </li>
              <li className="video-pros-list-item">
                <div className="pros-icon">
                  <ExtraServiceVideoPros3Icon />
                </div>
                <div className="pros-desc">
                  В&nbsp;начале ролика презентационная карточка игрока с&nbsp;данными и&nbsp;статистикой
                </div>
              </li>
            </ul>
            <div className="video-ready-in">
              Срок изготовления 5&nbsp;рабочих дней
            </div>
          </div>
          <div className="service-price">
            <div className="service-price-title">Стоимость</div>
            <div className="service-price-value">4 900 ₽</div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PlayerViewing2021;
