import React, { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import PhoneIcon from '../assets/svg/contacts/phone.svg';
import WhatsAppIcon from '../assets/svg/contacts/whatsapp.svg';
import TelegramIcon from '../assets/svg/contacts/telegram.svg';
import MailIcon from '../assets/svg/contacts/mail.svg';
import MapIcon from '../assets/svg/contacts/map.svg';
import InstagramLgIcon from '../assets/svg/instagram-lg.svg';
import InstagramIcon from '../assets/svg/instagram.svg';
import YouTubeLgIcon from '../assets/svg/youtube-lg.svg';
import YouTubeIcon from '../assets/svg/youtube.svg';
import TelegramLgIcon from '../assets/svg/telegram-lg.svg';
import Telegram2Icon from '../assets/svg/telegram.svg';
import Breadcrumbs from '../components/Breadcrumbs';
import FeedbackSection from '../components/FeedbackSection/FeedbackSection';
import Head from '../components/Head';
import MapModal from '../components/MapModal';
import Page from '../components/Page';
import useContactsMap from '../utils/hooks/useContactsMap';
import useFbPixel from '../utils/hooks/useFbPixel';
import useGTag from '../utils/hooks/useGTag';
import useYMetrika from '../utils/hooks/useYMetrika';

const ModalPortal = ({ children }) => {
  if (!process.browser) return null;
  return createPortal(children, window.document.body);
};

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
            "@id": "https://ghockeyagency.ru/contacts",
            "name": "Контакты"
          }
        }
      ]
    }
  `,
};

function Contacts() {
  const ym = useYMetrika();
  const gtag = useGTag();
  const fbq = useFbPixel();
  const [modalActive, setModalActive] = useState(false);
  const handlePhoneClick = useCallback(() => {
    ym('reachGoal', 'TEL_CLICKED');
    gtag('event', 'TEL_CLICKED');
    fbq('track', 'TEL_CLICKED');
  }, []);
  const handleWhatsappClick = useCallback(() => {
    ym('reachGoal', 'WHATSAPP_CLICKED');
    gtag('event', 'WHATSAPP_CLICKED');
    fbq('track', 'WHATSAPP_CLICKED');
  }, []);
  const handleTelegramClick = useCallback(() => {
    ym('reachGoal', 'TELEGRAM_CLICKED');
    gtag('event', 'TELEGRAM_CLICKED');
    fbq('track', 'TELEGRAM_CLICKED');
  }, []);
  const handleMapModalOpen = useCallback(() => setModalActive(true), []);
  const mapRef = useRef();
  useContactsMap(mapRef, true);

  return (
    <>
      <Head
        title="Контакты «Grishatov Hockey Agency»"
        desc="Контакты агентства Grishatov Hockey Agency - телефон, email, Instagram, Telegram, WhatsApp."
        page="/contacts"
        breadcrumbsData={BreadcrumbListStructuredData}
      />
      <Page pageKey="contacts">
        <section className="section section-contacts">
          <div className="container">
            <Breadcrumbs />
            <h1 className="h1 section-title">Контакты</h1>
          </div>
          <div className="contacts-and-social-links">
            <div className="contacts-wrap">
              <div className="container">
                <ul className="contacts-list">
                  <li className="contacts-list-item">
                    <a className="contacts-list-item-link" href="tel:+79160791214" onClick={handlePhoneClick}>
                      <PhoneIcon />
                      <span>+7 (916) 079-12-14</span>
                    </a>
                  </li>
                  <li className="contacts-list-item">
                    <a className="contacts-list-item-link" href="https://wa.me/79160791214" target="_blank" rel="noreferrer" onClick={handleWhatsappClick}>
                      <WhatsAppIcon />
                      <span>WhatsApp</span>
                    </a>
                  </li>
                  <li className="contacts-list-item">
                    <a className="contacts-list-item-link" href="https://t.me/GHA_hockey" target="_blank" rel="noreferrer" onClick={handleTelegramClick}>
                      <TelegramIcon />
                      <span>Телеграм</span>
                    </a>
                  </li>
                  <li className="contacts-list-item">
                    <a className="contacts-list-item-link" href="mailto:grishatov.hockey@gmail.com">
                      <MailIcon />
                      <span>grishatov.hockey@gmail.com</span>
                    </a>
                  </li>
                  <li className="contacts-list-item">
                    <span className="contacts-list-item-link" onClick={handleMapModalOpen}>
                      <MapIcon />
                      <span>Адрес: 115088, Москва, ул. Новоостаповская ул., 5 стр. 2</span>
                    </span>
                  </li>
                </ul>
                <div className="map-container">
                  <div className="static-map" ref={mapRef} />
                </div>
              </div>
            </div>
            <div className="social-links-wrap">
              <div className="container">
                <div className="social-links-title">Подписывайтесь на нас в соцсетях:</div>
                <div className="social-links-list">
                  <a href="https://www.youtube.com/channel/UCxvUYoLbYJJwtPErQ0vAVNw" className="youtube-link" target="_blank" rel="noreferrer">
                    <YouTubeLgIcon className="icon-desktop" />
                    <YouTubeIcon className="icon-mobile" />
                  </a>
                  <a href="https://www.instagram.com/gha_hockey/" className="instagram-link" target="_blank" rel="noreferrer">
                    <InstagramLgIcon className="icon-desktop" />
                    <InstagramIcon className="icon-mobile" />
                  </a>
                  <a href="https://t.me/grishatov_hockey_agency" className="telegram-link" target="_blank" rel="noreferrer">
                    <TelegramLgIcon className="icon-desktop" />
                    <Telegram2Icon className="icon-mobile" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <FeedbackSection title="Обратная связь" subtitle="Оставьте контакт, мы перезвоним и ответим на все вопросы" />

        <ModalPortal>
          <CSSTransition
            classNames="contacts-map-modal"
            timeout={150}
            in={modalActive}
            mountOnEnter
            unmountOnExit
          >
            <MapModal
              onClose={useCallback(() => setModalActive(false), [])}
            />
          </CSSTransition>
        </ModalPortal>
      </Page>
    </>
  );
}

export default Contacts;
