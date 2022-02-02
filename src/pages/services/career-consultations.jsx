import React from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';
import FeedbackSection from '../../components/FeedbackSection/FeedbackSection';
import Head from '../../components/Head';
import PageServices from '../../components/PageServices';
import useFullHeight from '../../utils/hooks/useFullHeight';

import ChoiceIcon from '../../assets/svg/services/career-consultations/services-career-consultations-choice.svg';
import HomeIcon from '../../assets/svg/services/career-consultations/services-career-consultations-home.svg';
import ProfessionalIcon from '../../assets/svg/services/career-consultations/services-career-consultations-professional.svg';
import VisaIcon from '../../assets/svg/services/career-consultations/services-career-consultations-visa.svg';
import WalletIcon from '../../assets/svg/services/career-consultations/services-career-consultations-wallet.svg';

const questions = [
  { icon: ChoiceIcon, label: 'Выбора страны, лиги и команды' },
  { icon: ProfessionalIcon, label: 'Перспектив и возможностей профессионального роста игрока' },
  { icon: VisaIcon, label: 'Оформления документов и визы' },
  { icon: HomeIcon, label: 'Условий проживания игроков за&nbsp;границей' },
  { icon: WalletIcon, label: 'Учебы и спорта за рубежом за&nbsp;счет стипендии' },
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
            "@id": "https://ghockeyagency.ru/services/career-consultations",
            "name": "Карьерные консультации"
          }
        }
      ]
    }
  `,
};

function CareerConsultations() {
  const height = useFullHeight();

  return (
    <>
      <Head
        title="Карьерные консультации хоккеистов в агентстве «GHA»"
        desc="Хоккейное агентство Гришатова бесплатно консультирует по вопросам развития спортивной карьеры игроков. Мы дадим развернутые ответы на все интересующие вопросы и профессиональную оценку перспектив игрока."
        page="/services/career-consultations"
        breadcrumbsData={BreadcrumbListStructuredData}
      />
      <PageServices subPageKey="career-consultations">
        <section className="section section-intro" style={{ height }}>
          <div className="container">
            <div className="intro-content">
              <Breadcrumbs />
              <h1 className="h1 section-title">Карьерные консультации хоккеистов</h1>
              <p className="intro-desc">Хоккейное агентство Гришатова бесплатно консультирует по вопросам развития спортивной карьеры игроков. Мы дадим развернутые ответы на все интересующие вопросы и профессиональную оценку перспектив игрока.</p>
            </div>
            <img className="intro-img" srcSet="/assets/img/services/common/1x/services-career-consultations-min.jpg, /assets/img/services/common/2x/services-career-consultations-min.jpg 2x" src="/assets/img/services/common/1x/services-career-consultations-min.jpg" alt="Услуги-Карьерные консультации" />
          </div>
        </section>
        <section className="section section-career-questions">
          <div className="container">
            <h2 className="h2 section-title blue-line">Вы можете обратиться за бесплатной консультацией по вопросам:</h2>
            <ul className="consult-questions-list">
              {questions.map(({ icon: Icon, label }) => (
                <li className="consult-questions-list-item" key={label}>
                  <Icon className="question-icon" />
                  <div className="question-label" dangerouslySetInnerHTML={{ __html: label }} />
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="section section-career-answers-by-agency-head">
          <div className="container">
            <div className="agency-head-photo" />
            <div className="answers-by-agency-head">
              <div className="answers-by-line" />
              <div className="answers-by-text">
                <span>На ваши вопросы ответит руководитель&nbsp;хоккейного&nbsp;агентства,</span><br/>
                <strong>Гришатов Егор Александрович</strong>
              </div>
            </div>
          </div>
        </section>
        <FeedbackSection title="Закажите бесплатную консультацию" subtitle="Мы подробно расскажем о карьерных&nbsp;перспективах Вашего&nbsp;ребенка" />
      </PageServices>
    </>
  );
}

export default CareerConsultations;
