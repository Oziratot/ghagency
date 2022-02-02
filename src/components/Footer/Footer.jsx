import React, { useCallback } from 'react';
import Link from 'next/link';
import { PAGES } from '../../constants/pages';
import useFbPixel from '../../utils/hooks/useFbPixel';
import useGTag from '../../utils/hooks/useGTag';
import useYMetrika from '../../utils/hooks/useYMetrika';
import OrderCallButton from '../Button/OrderCallButton';
import Logo from '../../assets/svg/logo.svg';
import YouTubeIcon from '../../assets/svg/youtube.svg';
import YouTubeXsIcon from '../../assets/svg/youtube-xs.svg';
import InstagramIcon from '../../assets/svg/instagram.svg';
import InstagramXsIcon from '../../assets/svg/instagram-xs.svg';
import PhoneIcon from '../../assets/svg/footer-phone.svg';

function getReorgonizedArray(array) {
  const arrayMiddleIndex = Math.ceil(array.length / 2);
  const firstPart = array.slice(0, arrayMiddleIndex);
  const secondPart = array.slice(arrayMiddleIndex);
  return firstPart.reduce((acc, item, index) => {
    const newAcc = [...acc, item];
    if (secondPart[index]) {
      newAcc.push(secondPart[index]);
    }
    return newAcc;
  }, []);
}

function Footer({ style }) {
  const ym = useYMetrika();
  const gtag = useGTag();
  const fbq = useFbPixel();
  const handlePhoneClick = useCallback(() => {
    ym('reachGoal', 'TEL_CLICKED');
    gtag('event', 'TEL_CLICKED');
    fbq('track', 'TEL_CLICKED');
  }, []);

  return (
    <footer className="footer" style={style}>
      <div className="container">
        <div className="logo-with-requisites">
          <Link href="/">
            <a className="footer-logo-link">
              <Logo className="footer-logo" />
            </a>
          </Link>
          <ul className="footer-requisites-list">
            <li>ИП Гришатов Егор Александрович</li>
            <li>ИНН 771894183640</li>
            <li>ОГРН 317774600057720</li>
          </ul>
          <div className="footer-social-links-tablet">
            <a href="https://www.youtube.com/channel/UCxvUYoLbYJJwtPErQ0vAVNw" className="youtube-link" target="_blank" rel="noreferrer">
              <YouTubeIcon />
            </a>
            <a href="https://www.instagram.com/gha_hockey/" className="instagram-link" target="_blank" rel="noreferrer">
              <InstagramIcon />
            </a>
          </div>
        </div>
        <ul className="footer-nav">
          {getReorgonizedArray(PAGES.filter(page => page.key !== 'main')).map((page) => (
            <li key={page.key}>
              <Link href={`/${page.key === 'main' ? '' : page.key}`}>
                <a className="nav-link">
                  {page.label}
                </a>
              </Link>
            </li>
          ))}
          <li>
            <div className="footer-social-links">
              <a href="https://www.youtube.com/channel/UCxvUYoLbYJJwtPErQ0vAVNw" className="youtube-link" target="_blank" rel="noreferrer">
                <YouTubeIcon className="icon-desktop" />
                <YouTubeXsIcon className="icon-mobile" />
              </a>
              <a href="https://www.instagram.com/gha_hockey/" className="instagram-link" target="_blank" rel="noreferrer">
                <InstagramIcon className="icon-desktop" />
                <InstagramXsIcon className="icon-mobile" />
              </a>
            </div>
          </li>
        </ul>

        <div className="footer-contacts">
          <div className="phone-with-order-call-button">
            <a href="tel:79160791214" className="phone-link" onClick={handlePhoneClick}>
              <PhoneIcon />
              <span>8 (916) 079-12-14</span>
            </a>
            <OrderCallButton>
              Заказать звонок
            </OrderCallButton>
          </div>
          <div className="footer-social-links-mobile">
            <span>Мы в соцсетях</span>
            <a href="https://www.youtube.com/channel/UCxvUYoLbYJJwtPErQ0vAVNw" className="youtube-link" target="_blank" rel="noreferrer">
              <YouTubeIcon />
            </a>
            <a href="https://www.instagram.com/gha_hockey/" className="instagram-link" target="_blank" rel="noreferrer">
              <InstagramIcon />
            </a>
          </div>
          <div className="privacy-policy">
            <Link href="/legal/policy">
              <a className="privacy-policy-link">Политика конфиденциальности</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
