import React from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';
import FeedbackSection from '../../components/FeedbackSection/FeedbackSection';
import Head from '../../components/Head';
import IconLabelList from '../../components/IconLabelList';
import PageServices from '../../components/PageServices';
import useFullHeight from '../../utils/hooks/useFullHeight';
import BonusIcon from '../../assets/svg/services/supervising-abroad/services-supervising-abroad-free-first-year.svg';
import SupervisingContentIcon1 from '../../assets/svg/services/supervising-abroad/services-supervising-abroad-taxi.svg';
import SupervisingContentIcon2 from '../../assets/svg/services/supervising-abroad/services-supervising-abroad-home.svg';
import SupervisingContentIcon3 from '../../assets/svg/services/supervising-abroad/services-supervising-abroad-partner.svg';
import SupervisingContentIcon4 from '../../assets/svg/services/supervising-abroad/services-supervising-abroad-hockey.svg';
import SupervisingContentIcon5 from '../../assets/svg/services/supervising-abroad/services-supervising-abroad-med.svg';
import SupervisingContentIcon6 from '../../assets/svg/services/supervising-abroad/services-supervising-abroad-dashboard.svg';
import SupervisingContentIcon7 from '../../assets/svg/services/supervising-abroad/services-supervising-abroad-idea.svg';

const supervisingContentItems = [
  { icon: SupervisingContentIcon1, label: 'Поможем организовать встречу игрока в аэропорту ' },
  { icon: SupervisingContentIcon2, label: 'Проконтролируем бытовые условия проживания' },
  { icon: SupervisingContentIcon3, label: 'Поможем быстрее адаптироваться к среде: дадим рекомендации по общению с тренерами и менеджерами клуба, советы по выстраиванию отношений в команде и поведению в семье' },
  { icon: SupervisingContentIcon4, label: 'При необходимости договоримся о дополнительных тренировках или занятиях по иностранному языку' },
  { icon: SupervisingContentIcon5, label: 'В случае болезни поможем записаться на прием к врачу' },
  { icon: SupervisingContentIcon6, label: 'Защищаем интересы игрока — проследим за выполнением всех пунктов договора с клубом' },
  { icon: SupervisingContentIcon7, label: 'Окажем помощь при возникновении конфликтных ситуаций' },
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
            "@id": "https://ghockeyagency.ru/services/supervising-abroad",
            "name": "Курирование игроков за границей"
          }
        }
      ]
    }
  `,
};

function SupervisingAbroad() {
  const height = useFullHeight();

  return (
    <>
      <Head
        title="Курирование игроков за границей — хоккейное агентство «GHA»"
        desc="Хоккейное агентство Гришатова курирует игроков после устройства в команду. Мы поддерживаем связь с руководством клуба и следим за удовлетворенностью подопечных спортивными и бытовыми условиями. В любой момент предоставляем родителям обратную связь."
        page="/services/supervising-abroad"
        breadcrumbsData={BreadcrumbListStructuredData}
      />
      <PageServices subPageKey="supervising-abroad">
        <section className="section section-intro" style={{ height }}>
          <div className="container">
            <div className="intro-content">
              <Breadcrumbs />
              <h1 className="h1 section-title">Курирование игроков за границей</h1>
              <p className="intro-desc">GHA курирует игроков после устройства в хоккейную команду. Мы поддерживаем связь с руководством клуба и следим за удовлетворенностью подопечных спортивными и бытовыми условиями. В любой момент можем предоставить родителям обратную связь о динамике развития игрока.</p>
            </div>
            <img className="intro-img" srcSet="/assets/img/services/common/1x/services-supervising-abroad-min.jpg, /assets/img/services/common/2x/services-supervising-abroad-min.jpg 2x" src="/assets/img/services/common/1x/services-supervising-abroad-min.jpg" alt="Услуги-Курирование за границей" />
          </div>
        </section>
        <section className="section section-free-first-year">
          <div className="container">
            <div className="bonus-illustration">
              <img loading="lazy" src="/assets/img/services/supervising-abroad/services-supervising-abroad-2-min.png" alt="Услуги-Курирование за границей"/>
            </div>
            <div className="bonus-desc">
              <BonusIcon className="bonus-icon" />
              <div className="bonus-text">
                Услуга курирования бесплатна для клиентов агентства в первый год сотрудничества.
              </div>
            </div>
          </div>
        </section>
        <section className="section section-supervising-contents">
          <div className="container">
            <h2 className="h2 section-title">Что входит в услугу курирования хоккеиста:</h2>
            <IconLabelList items={supervisingContentItems} />
          </div>
        </section>
        <FeedbackSection title="Остались вопросы?" subtitle="Оставьте номер телефона, мы перезвоним и бесплатно проконсультируем" />
      </PageServices>
    </>
  );
}

export default SupervisingAbroad;
