import React, {
 forwardRef, memo, useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useRouter } from 'next/router';
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
import ArrowIcon from '../../../assets/svg/arrow.svg';
import Button from '../../../components/Button';

const details = [
  { id: '3-days-3-games', value: '3', label: 'Игры за&nbsp;3&nbsp;дня' },
  { id: 'scouts', value: '9', label: 'Зарубежных скаутов' },
  { id: '50-usa-and-europe-teams', value: '50+', label: 'Команд США, Канады&nbsp;и&nbsp;Европы' },
  { id: 'address', value: <MapPointIcon className="map-icon" />, label: 'Москва ЛД&nbsp;«Морозово»' },
];

const statistics = [
  { title: '70%', text: 'Участников получают приглашения в&nbsp;команды' },
  { title: '43&nbsp;000&nbsp;$', text: 'Мы&nbsp;сэкономили участникам просмотра 2021&nbsp;за&nbsp;счёт скидок на&nbsp;взнос в&nbsp;команды и&nbsp;стипендий' },
  { title: '30+', text: 'Положительных отзывов клиентов на&nbsp;Kidshockey' },
];

const viewStatistics = [
  { title: '75', text: 'Участников просмотра' },
  { title: '52', text: 'Получили приглашения в&nbsp;команду' },
  { title: '29', text: 'Игроков уехали за границу' },
  { title: '6', text: 'Игроков получают зарплату' },
];

const scouts = [
  { name: 'Шон Уэрф', photo: '/assets/img/services/player-viewing/scouts/scout-2.jpg', desc: 'Генеральный менеджер Bradford Rattlers GMHL, Канада' },
  { name: 'Коди Ганье', photo: '/assets/img/services/player-viewing/scouts/scout-1.jpg', desc: 'Главный тренер Northeast Generals U16, США<br />Ассистент главного тренера Northeast Generals NAHL, США<br />Програмный директор Northeast Generals Academy' },
  { name: 'Крис Вилк', photo: '/assets/img/services/player-viewing/scouts/scout-17.png', desc: 'Главный тренер Cleveland Barons U18 T1EHL, США<br />Скаут Lincoln Stars USHL, США' },
  { name: 'Адам Бортоломей', photo: '/assets/img/services/player-viewing/scouts/scout-3.jpg', desc: 'Главный тренер Philadelphia Hockey Club USPHL Premier, США<br />Ассистент главного тренера Philadelphia Hockey Club NCDC, США' },
  { name: 'Марк Андре-Карон', photo: '/assets/img/services/player-viewing/scouts/scout-4.jpg', desc: 'Генеральный менеджер Ville-Marie Pirates GMHL, Канада' },
  { name: 'Глен Кэмпбэл', photo: '/assets/img/services/player-viewing/scouts/scout-13.png', desc: 'Владелец Northumberland Stars GMHL, Канада' },
  { name: 'Райан Уитсон', photo: '/assets/img/services/player-viewing/scouts/scout-14.png', desc: 'Главный тренер Cleveland Barons U14 T1EHL, США,<br />Скаут Lone Star Brahmas NAHL, США' },
  { name: 'Райан Вуд', photo: '/assets/img/services/player-viewing/scouts/scout-15.png', desc: 'Главный тренер New Tecumseth Civics GMHL, Канада' },
  { name: 'Дуг Орр', photo: '/assets/img/services/player-viewing/scouts/scout-16.png', desc: 'Главный тренер York Simcoe Express U14&nbsp;AAA ETAHL, Канада, Скаут Gatineau Olympiques QMJHL, Канада' },
];

const countries = [
{
    id: 'usa',
    label: 'Команды США',
    photo: '/assets/img/services/player-viewing/2022/teams-usa.png',
    teams: [
      { label: '&#8226; Lincoln Stars USHL', border: true },
      { label: '&#8226; Lone Star Brahmas NAHL' },
      { label: '&#8226; Northeast Generals NAHL', border: true },
      { label: '&#8226; Northeast Generals NA3HL', border: true },
      { label: '&#8226; Northeast Generals NAPHL', border: true },
      { label: '&#8226; Cleveland Barons&nbsp;T1EHL', border: true },
      { label: '&#8226; Philadelphia Hockey Club NCDC', border: true },
      { label: '&#8226; Philadelphia Hockey Club USPHL Premier' },
    ],
  },
{
    id: 'canada',
    label: 'Команды Канады',
    photo: '/assets/img/services/player-viewing/2022/teams-canda.png',
    teams: [
      { label: '&#8226; Gatineau Olympiques QMJHL', border: true },
      { label: '&#8226; Bradford Rattlers GMHL' },
      { label: '&#8226; Ville-Marie Pirates GMHL' },
      { label: '&#8226; New Tecumseth Civics GMHL' },
      { label: '&#8226; Northumberland Stars GMHL', border: true },
      { label: '&#8226; York Simcoe Express ETAHL', border: true },
      { label: '&#8226; Toronto Red Wings GTHL' },
      { label: '&#8226; Toronto Titans GTHL' },
      { label: '&#8226; Vaughan Kings GTHL' },
      { label: '&#8226; Don Mills Flyers GTHL' },
      { label: '&#8226; North York Rangers GTHL' },
      { label: '&#8226; Mississauga Senators GTHL' },
    ],
  },
{
    id: 'eu',
    label: 'Команды Европы',
    photo: '/assets/img/services/player-viewing/2022/teams-eu.png',
    teams: [
      { label: '&#8226; Grästorps IK, Швеция' },
      { label: '&#8226; Leksands IF, Швеция' },
      { label: '&#8226; Malmo Redhawks, Швеция', border: true },
      { label: '&#8226; BC Mlada Boleslav, Чехия' },
      { label: '&#8226; HC Kometa Brno, Чехия', border: true },
      { label: '&#8226; MHC Martin, Словакии' },
      { label: '&#8226; HK Nitra, Словакия' },
      { label: '&#8226; HK Skalica, Словакия' },
      { label: '&#8226; ŠHK 37 Piestany, Словакия' },
      { label: '&#8226; HK Ruzinov 99, Словакия', border: true },
      { label: '&#8226; Pesterzsébeti Farkasok, Венгрия' },
      { label: '&#8226; Györi ETO HC, Венгрия' },
      { label: '&#8226; Vasas SC, Венгрия' },
      { label: '&#8226; Dunaujvaros AC, Венгрия' },
      { label: '&#8226; Debrecen, Венгрия' },
      { label: '&#8226; MAC, Венгрия' },
      { label: '&#8226; Fehervar AV19, Венгрия' },
      { label: '&#8226; Miskolc, Венгрия' },
      { label: '&#8226; HC Lehel,Венгрия' },
      { label: '&#8226; HK Karpati Farkasok ERD,Венгрия', border: true },
      { label: '&#8226; Meudon, Франция' },
      { label: '&#8226; Besancon, Франция', border: true },
      { label: '&#8226; Krefelder EV 1981 DNL, Германия' },
      { label: '&#8226; Iserlohner EC DNL, Германия', border: true },
      { label: '&#8226; Odense Bulldogs, Дания' },
      { label: '&#8226; Rødovre, Дания', border: true },
      { label: '&#8226; Stavanger Oilers, Норвегия', border: true },
      { label: '&#8226; Sport, Финляндия' },
      { label: '&#8226; TUTO Hockey, Финляндия' },
      { label: '&#8226; Ketterä, Финляндия' },
    ],
  },
];

const view2021 = [
  { src: '/assets/img/services/player-viewing/view2021/gha-2020-view-1.jpg' },
  { src: '/assets/img/services/player-viewing/view2021/gha-2020-view-2.jpg' },
  { src: '/assets/img/services/player-viewing/view2021/gha-2020-view-3.jpg' },
  { src: '/assets/img/services/player-viewing/view2021/gha-2020-view-4.jpg' },
  { src: '/assets/img/services/player-viewing/view2021/gha-2020-view-5.jpg' },
  { src: '/assets/img/services/player-viewing/view2021/gha-2020-view-6.jpg' },
  { src: '/assets/img/services/player-viewing/view2021/gha-2020-view-7.jpg' },
  { src: '/assets/img/services/player-viewing/view2021/gha-2020-view-8.jpg' },
  { src: '/assets/img/services/player-viewing/view2021/gha-2020-view-9.jpg' },
  { src: '/assets/img/services/player-viewing/view2021/gha-2020-view-10.jpg' },
  { src: '/assets/img/services/player-viewing/view2021/gha-2020-view-11.jpg' },
  { src: '/assets/img/services/player-viewing/view2021/gha-2020-view-12.jpg' },
  { src: '/assets/img/services/player-viewing/view2021/gha-2020-view-13.jpg' },
  { src: '/assets/img/services/player-viewing/view2021/gha-2020-view-14.jpg' },
  { src: '/assets/img/services/player-viewing/view2021/gha-2020-view-15.jpg' },
  { src: '/assets/img/services/player-viewing/view2021/gha-2020-view-16.jpg' },
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
            "@id": "https://ghockeyagency.ru/services/player-viewing/2022",
            "name": "Просмотр 2022"
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
  const router = useRouter();
  const formModalContext = useContext(ContactFormModalContext);
  const [teamsVisibleNumber, setTeamsVisibleNumber] = useState(6);
  const [goToCamp, setGoToCamp] = useState(false);
  const [desktopScoutsVisibleNumber, setDesktopScoutsVisibleNumber] = useState(3);
  const [photos2020, setPhotos2020] = useState(view2021);
  const [activeScoutPanels, setActiveScoutPanels] = useState([]);
  const [activeFaqItems, setActiveFaqItems] = useState({ 0: true });
  const [hockeyCampModalActive, setHockeyCampModalActive] = useState(false);
  const [videoModalActive, setVideoModalActive] = useState(false);
  const [teamsList, setTeamsList] = useState({ usa: true, canada: false, eu: false });
  const mapRef = useRef();
  useContactsMap(mapRef, true);

  const handleHockeyCampModalOpen = useCallback(() => setHockeyCampModalActive(true), []);
  const handleVideoModalOpen = useCallback(() => setVideoModalActive(true), []);
  const handleHockeyCampModalClose = useCallback(() => setHockeyCampModalActive(false), []);
  const handleVideoModalClose = useCallback(() => setVideoModalActive(false), []);
  const handleCampClick = useCallback(() => {
    setHockeyCampModalActive(false);
    setGoToCamp(true);
  }, []);
  const handleTeamsClick = useCallback((id) => {
    setTeamsList((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  useEffect(() => {
    if (!hockeyCampModalActive && goToCamp) {
      router.push('/services/training-camp-2022').then(() => window.scrollTo(0, 0));
    }
  }, [hockeyCampModalActive, goToCamp]);

  const handleContactFormOpen = useCallback((e) => {
    e.stopPropagation();
    formModalContext.setModalShown(true);
  }, []);

  const faq = useMemo(() => ([
    {
      question: 'Можно&nbsp;ли&nbsp;сейчас уехать за&nbsp;границу?',
      answer: (<>Да, агентство оказывает полное содействие и&nbsp;поддержку на&nbsp;всех этапах трудоустройства игрока в&nbsp;зарубежный клуб, включая вопросы получения виз&nbsp;и&nbsp;переездов. Мы&nbsp;можем организовать получение студенческих, туристических, рабочих и&nbsp;спортивных виз&nbsp;в&nbsp;США, Канаду и&nbsp;Европу и&nbsp;сопровождаем игрока в&nbsp;процессе их&nbsp;получения.</>),
    },
    {
      question: 'Реально&nbsp;ли&nbsp;уехать после&nbsp;вашего просмотра?',
      answer: (<>Да, реально. Наш&nbsp;просмотр&nbsp;— ежегодный, вы&nbsp;можете ознакомиться результатами участников предыдущих лет&nbsp;на&nbsp;странице <Link href="/players" passHref><CustomA className="blue-link">Игроки</CustomA></Link>. Из&nbsp;75&nbsp;участников просмотра предыдущего года приглашения в&nbsp;зарубежные клубы получил 51&nbsp;игрок, 29&nbsp;из&nbsp;них&nbsp;уехали в&nbsp;зарубежные лиги, 6&nbsp;из&nbsp;них&nbsp;подписали профессиональные контракты и&nbsp;получают зарплаты.</>),
    },
    {
      question: 'За&nbsp;чей&nbsp;счёт осуществляется переезд в&nbsp;зарубежные лиги?',
      answer: (<>Игроки уровня национальной сборной могут рассчитывать на&nbsp;полное покрытие всех расходов на&nbsp;переезд, в&nbsp;случае интереса со&nbsp;стороны высших молодёжных лиг&nbsp;США, Канады и&nbsp;аффилированных с&nbsp;ними клубов&nbsp;НХЛ. Для&nbsp;остальных игроков переезд в&nbsp;лиги Северной Америки осуществляется полностью за&nbsp;свой счёт. Подробнее на&nbsp;<span className="blue-link" onClick={handleContactFormOpen}>бесплатной&nbsp;консультации</span>.<br /><br />Европейские молодёжные клубы частично покрывают расходы игроков на&nbsp;переезд, проживание и&nbsp;питание, взнос игрока в&nbsp;команду будет зависеть от&nbsp;множества факторов. Для&nbsp;подробного ответа на&nbsp;ваш&nbsp;вопрос вы&nbsp;можете заказать <span className="blue-link" onClick={handleContactFormOpen}>бесплатную&nbsp;консультацию</span>.</>),
    },
    {
      question: 'Хоккеистам платят зарплаты в&nbsp;зарубежных клубах?',
      answer: (<>Игроки уровня национальной сборной, играющие на&nbsp;молодёжном уровне в&nbsp;CHL (высшая молодёжная лига Канады) или&nbsp;же&nbsp;игроки выступающие за&nbsp;профессиональные взрослые и&nbsp;некоторые молодёжные команды Европы могут рассчитывать на&nbsp;зарплату.</>),
    },
    {
      question: 'Сколько стоит сезон в&nbsp;зарубежных лигах?',
      answer: (<>Финальная сумма зависит от&nbsp;множества факторов: возраст, игровой опыт, уровень игрока, страна команды, лига&nbsp;и&nbsp;т.д. Более подробно о&nbsp;стоимости хоккея за&nbsp;рубежом вы&nbsp;можете узнать на&nbsp;<span className="blue-link" onClick={handleContactFormOpen}>бесплатной&nbsp;консультации</span>.</>),
    },
    {
      question: 'Входит&nbsp;ли&nbsp;проживание и&nbsp;питание в&nbsp;стоимость просмотра?',
      answer: (<>Нет, не&nbsp;входит. Игроки самостоятельно обеспечивают себя проживанием и&nbsp;питанием на&nbsp;время проведения просмотра. В&nbsp;шаговой доступности от&nbsp;ледового находится большое количество гостиниц и&nbsp;мест питания.</>),
    },
    {
      question: 'Можно&nbsp;ли&nbsp;оставлять форму на&nbsp;ледовой арене во&nbsp;время просмотра?',
      answer: (<>Да, на&nbsp;ледовой арене есть&nbsp;возможность хранения и&nbsp;стирки экипировки&nbsp;— это&nbsp;платная услуга, стоимость уточняйте у&nbsp;администрации ледового комплекса.</>),
    },
  ]), []);

  // useEffect(() => {
  //   // TODO: remove after issue resolve and true lazy loading is possible https://github.com/brainhubeu/react-carousel/issues/389
  //   setTimeout(() => {
  //     setPhotos2020((prevPhotos) => (
  //       [
  //         ...prevPhotos,
  //         { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-11.jpg' },
  //         { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-12.jpg' },
  //         { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-13.jpg' },
  //         { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-14.jpg' },
  //         { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-15.jpg' },
  //         { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-16.jpg' },
  //         { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-17.jpg' },
  //         { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-18.jpg' },
  //         { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-19.jpg' },
  //         { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-20.jpg' },
  //         { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-21.jpg' },
  //         { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-22.jpg' },
  //         { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-23.jpg' },
  //         { src: '/assets/img/services/player-viewing/view2020/gha-2020-view-24.jpg' },
  //       ]
  //     ));
  //   }, 2500);
  // }, []);

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

  const handleAllTeamsShowMoreClick = useCallback(() => {
    const newMobileTeamsVisibleNumber = teamsVisibleNumber + 19 > countries[2].teams.length ? countries[2].teams.length : teamsVisibleNumber + 30;
    setTeamsVisibleNumber(newMobileTeamsVisibleNumber);
  }, [teamsVisibleNumber]);

  const handleShowLessClick = useCallback(() => {
    setTeamsVisibleNumber(6);
  }, []);

  const handleScoutsShowAllClick = useCallback(() => setDesktopScoutsVisibleNumber(scouts.length), []);

  return (
    <>
      <Head
        title="Просмотр хоккеистов 2022 | хоккейное агентство «GHA»"
        desc="Хоккейное агентство Гришатова ежегодно организовывает просмотровые турниры в Москве и отправляет игроков на крупнейшие просмотровые мероприятия за границу. Участие в турнирах — это реальная возможность быть замеченным и пройти отбор в лучшие команды США и Канады."
        page="/services/player-viewing/2022"
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
              <div className="teams-wrap">
                <div className="teams-list">
                  {countries.map((item) => (
                    <div className="teams " key={item.label}>
                      <div className="teams-list-item hidden-xs">
                        <img className="team-img" src={item.photo} />
                        <p className="country">{item.label}</p>
                      </div>

                      <div className="teams-list-item visible-xs" onClick={() => handleTeamsClick(item.id)}>
                        <img className="team-img" src={item.photo} />
                        <p className="country">{item.label}</p>
                        <ArrowIcon className={classnames('team-arrow', { active: teamsList[item.id] })} />
                      </div>

                      <ul className="teams-list-all hidden-xs">
                        <TransitionGroup component={null}>
                          {item.teams.slice(0, teamsVisibleNumber).map((team) => (
                            <CSSTransition
                              key={team.label}
                              timeout={450}
                              classNames="team-item"
                            >
                              <li key={team.label} className={classnames('team-item', { bordered: team.border })}>
                                <div key={team.label} className="teams-list-item-content" dangerouslySetInnerHTML={{ __html: team.label }} />
                              </li>
                            </CSSTransition>
                          ))}
                        </TransitionGroup>
                      </ul>

                      <ul className={classnames('teams-list-all visible-xs', { active: teamsList[item.id] })}>
                        <TransitionGroup component={null}>
                          {item.teams.map((team) => (
                            <CSSTransition
                              key={team.label}
                              timeout={450}
                              classNames="team-item"
                            >
                              <li key={team.label} className={classnames('team-item', { bordered: team.border })}>
                                <div key={team.label} className="teams-list-item-content" dangerouslySetInnerHTML={{ __html: team.label }} />
                              </li>
                            </CSSTransition>
                          ))}
                        </TransitionGroup>
                        <div onClick={() => handleTeamsClick(item.id)} className={classnames('show-less-mobile', { active: !!teamsList[item.id] })}>Свернуть</div>
                      </ul>
                    </div>
                  ))}
                </div>
                <CSSTransition in={teamsVisibleNumber < countries[2].teams.length} classNames="show-more-block" timeout={300} unmountOnExit>
                  <div className="show-more-block hidden-xs">
                    <button className="show-more-btn" type="button" onClick={handleAllTeamsShowMoreClick}>Показать еще</button>
                    <DoubleArrowDownIcon className="show-more-icon" onClick={handleAllTeamsShowMoreClick} />
                  </div>
                </CSSTransition>
                <CSSTransition in={teamsVisibleNumber >= countries[2].teams.length} classNames="show-more-block" timeout={300} unmountOnExit>
                  <div className="show-more-block hidden-xs">
                    <DoubleArrowDownIcon className="show-more-icon less" onClick={handleShowLessClick} />
                    <button className="show-more-btn" type="button" onClick={handleShowLessClick}>Свернуть</button>
                  </div>
                </CSSTransition>
              </div>
            </div>
          </div>
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
          <h2 className="h2 section-title tablet-mobile-title">Как проходит просмотр</h2>
          <div className="section-illustration">
            <img className="hidden-xs" src="/assets/img/services/player-viewing/2022/gha-view-2022-format-desktop.jpg" alt="Формат просмотра GHA 2021" />
            <img className="visible-xs" src="/assets/img/services/player-viewing/2021/gha-view-2021-format-mobile.jpg" alt="Формат просмотра GHA 2021" />
          </div>
          <div className="section-content">
            <h2 className="h2 section-title desktop-title">Как проходит просмотр</h2>
            <div className="section-text">
              Просмотр проходит по классической схеме<br />
              североамериканских просмотровых кэмпов:<br /><br />
              — 3 игры за 3 дня<br /><br />
              — 4 команды<br /><br />
              — 15 полевых и 2 вратаря в команде<br /><br />
              Такой формат применяется в юношеских, молодёжных и профессиональных лигах Северной Америки.<br /><br />
              На протяжении 4-х лет мы совершенствовали схему проведения турнира, чтобы у каждого участника был реальный шанс получить предложение из зарубежного клуба.<br /><br />
              Приглашённые скауты и клубы оценивают игроков в режиме онлайн во время прямой трансляции матчей на YouTube.<br /><br />
              По итогам просмотра игроки подписывают контракты с агентством и клубами.
            </div>
          </div>
        </section>

        <section className="section section-bubbles-info">
          <div className="container">
            <h2 className=" h2 section-title">Почему нужно участвовать<br />в&nbsp;нашем просмотре</h2>
            <div className="statistics">
              {statistics.map((item) => (
                <div key={item.text} className="statistics-container">
                  <div className="statistics-title" dangerouslySetInnerHTML={{ __html: item.title }} />
                  <div className="statistics-text" dangerouslySetInnerHTML={{ __html: item.text }} />
                </div>
              ))}
            </div>
            <h2 className="h2">Статистика просмотра 2021</h2>
            <div className="view-statistics">
              {viewStatistics.map((item) => (
                <div key={item.title} className={`outer-circle circle-${item.title}`}>
                  <div className="inner-circle">
                    <p className="circle-title">{item.title}</p>
                    <div className="circle-text" dangerouslySetInnerHTML={{ __html: item.text }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        <section className="section section-last-views-results">
          <div className="container">
            <h2 className="h2 section-title with-overflow">Результаты игроков прошлых просмотров</h2>
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
            <p className="registration-ends">Регистрация для&nbsp;группы 2007–2009&nbsp;г.&nbsp;р. заканчивается 11&nbsp;мая</p>
            <p className="registration-ends two">Регистрация для&nbsp;группы 2003–2006&nbsp;г.р. заканчивается 30&nbsp;мая</p>
            <div className="price-desc-block">
              <p className="price-includes-title">В&nbsp;стоимость включено:</p>
              <ul className="price-includes-list">
                <li className="price-includes-list-item">—&nbsp;Конференция о структуре североамериканского и европейского хоккея</li>
                <li className="price-includes-list-item">—&nbsp;Помощь с&nbsp;определением направления продолжения карьеры</li>
                <li className="price-includes-list-item">—&nbsp;План развития игрока в&nbsp;личной консультации</li>
                <li className="price-includes-list-item">—&nbsp;3&nbsp;просмотровые игры</li>
                <li className="price-includes-list-item">—&nbsp;Прямая трансляция матчей на&nbsp;Youtube</li>
                <li className="price-includes-list-item">—&nbsp;Игровая майка и&nbsp;гамаши участника просмотра</li>
                <li className="price-includes-list-item">— Вода и спортивные напитки</li>
              </ul>
              <div className="price-amounts">
                <div className="current-price">29 900&nbsp;₽</div>
                <div className="participation-extra">
                  <div className="participation-condition">с&nbsp;16&nbsp;мая&nbsp;— 49 900&nbsp;₽</div>
                  <div className="participation-condition">с&nbsp;30&nbsp;мая, после завершения регистрации&nbsp;— 99 900&nbsp;₽</div>
                </div>
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
                    <img src="/assets/img/services/player-viewing/2022/extra-service-1.jpg" alt="Хоккейный лагерь" />
                  </div>
                  <div className="extra-service-info">
                    <div className="extra-service-name">Хоккейный лагерь</div>
                    <div className="extra-service-wrap">
                      <div className="extra-service-desc">13&nbsp;июня&nbsp;— 18&nbsp;июня</div>
                      <div className="extra-service-price">29&nbsp;900&nbsp;₽</div>
                    </div>
                    <div className="extra-service-wrap">
                      <div className="extra-service-desc">6&nbsp;июня&nbsp;— 18&nbsp;июня</div>
                      <div className="extra-service-price">49&nbsp;900&nbsp;₽</div>
                    </div>
                  </div>
                  <div className="details-link">Подробнее</div>
                </div>
              </li>
              <li className="extra-services-list-item">
                <div className="extra-service" onClick={handleVideoModalOpen}>
                  <div className="extra-service-image">
                    <img src="/assets/img/services/player-viewing/2022/extra-service-2.jpg" alt="Видеонарезка" />
                  </div>
                  <div className="extra-service-info">
                    <div className="extra-service-name">Видеонарезка</div>
                    <div className="extra-service-desc second">Лучшие моменты игрока <br />для&nbsp;портфолио</div>
                    <div className="extra-service-price">5&nbsp;000&nbsp;₽</div>
                  </div>
                  <div className="details-link">Подробнее</div>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="section section-last-view">
          <h2 className="h2 section-title with-overflow">Фотографии просмотра 2021</h2>
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
          <img className="hidden-xs-sm" src="/assets/img/services/player-viewing/2022/extra-service-illustration-1.jpg" alt="Дополнительно - хоккейный лагерь" />
          <img className="visible-xs-sm" src="/assets/img/services/player-viewing/2022/extra-service-illustration-1-mobile-tablet.jpg" alt="Дополнительно - хоккейный лагерь" />
        </div>
        <div className="extra-service-description">
          <div className="service-title section-title">Хоккейный лагерь</div>
          <div className="service-details">
            <div className="camp-info-block">
              <div className="camp-target">Только для&nbsp;участников 2003–2006&nbsp;г. р. </div>
              <div className="camp-info">На базе школы хоккея Grishatov Hockey</div>
              <div className="camp-dates">Даты: 6–18&nbsp;июня</div>
              <div className="camp-coaches-title">Тренеры</div>
              <div className="camp-coaches">
                <div className="camp-coach">
                  <img className="camp-coach-photo" src="/assets/img/services/player-viewing/2022/extra-service-coach-vinokurov.png" alt="Тренер Илья Винокуров" />
                  <div className="camp-coach-name">Илья Винокуров</div>
                </div>
                <div className="camp-coach">
                  <img className="camp-coach-photo" src="/assets/img/services/player-viewing/2022/extra-service-coach-mihin.png" alt="Тренер Дмитрий Михин" />
                  <div className="camp-coach-name">Дмитрий Михин</div>
                </div>
                <div className="camp-coach">
                  <img className="camp-coach-photo" src="/assets/img/services/player-viewing/2022/extra-service-coach-yurin.png" alt="Тренер Александр Юрин" />
                  <div className="camp-coach-name">Александр Юрин</div>
                </div>
              </div>
            </div>

            <div className="camp-schedule-block">
              <div className="camp-schedule-title">Расписание</div>
              <ul className="camp-schedule-list">
                <li className="camp-schedule-list-item">
                  <div className="item-title section-title">Понедельник–Пятница</div>
                  <div className="item-content">
                    <div className="item-content-element">• 1&nbsp;час&nbsp;15&nbsp;минут лёд</div>
                    <div className="item-content-element">• 1&nbsp;час&nbsp;15&nbsp;минут земля</div>
                  </div>
                </li>
                <li className="camp-schedule-list-item">
                  <div className="item-title section-title">Суббота</div>
                  <div className="item-content">
                    <div className="item-content-element">• 1 час 30 минут игра</div>
                    <div className="item-content-element">• Восстанавливающая баня</div>
                  </div>
                </li>
              </ul>
              <div className="camp-schedule-address">
                <div className="address-title with-overflow">
                  <div className="address">Адрес:</div>
                  <div className="address-content">&nbsp;лд&nbsp;«Морозово», ул.&nbsp;Новоостаповская, д.&nbsp;5&nbsp;с&nbsp;2</div>
                </div>
              </div>
            </div>
          </div>
          <div className="service-price">
            <div className="service-price-wrap">
              <div className="service-price-container">
                <div className="service-price-title">Лагерь на 6 дней</div>
                <div className="service-price-value">29 900 ₽</div>
              </div>
              <div className="service-price-container">
                <div className="service-price-title">Лагерь на 12 дней</div>
                <div className="service-price-value">49 900 ₽</div>
              </div>
            </div>
            <Button className="camp-button" onClick={handleCampClick}>Подробнее</Button>
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
          <img className="hidden-xs-sm" src="/assets/img/services/player-viewing/2022/extra-service-illustration-2.jpg" alt="Дополнительно - видеонарезка" />
          <img className="visible-xs-sm" src="/assets/img/services/player-viewing/2022/extra-service-illustration-2-mobile-tablet.jpg" alt="Дополнительно - видеонарезка" />
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
          <div className="service-price second">
            <div className="service-price-title second">Стоимость</div>
            <div className="service-price-value">5 000 ₽</div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PlayerViewing2021;
