import React, { useState } from 'react';
import classnames from 'classnames';
import Breadcrumbs from '../../components/Breadcrumbs';
import FeedbackSection from '../../components/FeedbackSection/FeedbackSection';
import Head from '../../components/Head';
import PageServices from '../../components/PageServices';
import useFullHeight from '../../utils/hooks/useFullHeight';

import AdvantagesSportSelectionIcon from '../../assets/svg/services/find-job-abroad/advantages/services-find-job-abroad-sport-selection.svg';
import AdvantagesProfessionalGrowthIcon from '../../assets/svg/services/find-job-abroad/advantages/services-find-job-abroad-professional-growth.svg';
import AdvantagesInternationalEducationIcon from '../../assets/svg/services/find-job-abroad/advantages/services-find-job-abroad-international-education.svg';
import AdvantagesEmigrationOpportunitiesIcon from '../../assets/svg/services/find-job-abroad/advantages/services-find-job-abroad-emigration-opportunities.svg';
import AdvantagesForeignLanguageLearningIcon from '../../assets/svg/services/find-job-abroad/advantages/services-find-job-abroad-foreign-language-learning.svg';

import StepsRequestIcon from '../../assets/svg/services/find-job-abroad/steps/services-find-job-abroad-request.svg';
import StepsRatingIcon from '../../assets/svg/services/find-job-abroad/steps/services-find-job-abroad-rating.svg';
import StepsChoiceIcon from '../../assets/svg/services/find-job-abroad/steps/services-find-job-abroad-choice.svg';
import StepsContractIcon from '../../assets/svg/services/find-job-abroad/steps/services-find-job-abroad-contract.svg';
import StepsSupervisingIcon from '../../assets/svg/services/find-job-abroad/steps/services-find-job-abroad-supervising.svg';

const advantages = [
  { icon: AdvantagesSportSelectionIcon, title: 'Отбор по спортивному принципу', desc: 'В зарубежных клубах на перспективы хоккеиста влияет только его уровень игры. Полностью прозрачная и справедливая система отбора.' },
  { icon: AdvantagesProfessionalGrowthIcon, title: 'Профессиональный рост игрока', desc: 'Игрок постоянно находится на виду у клубов высших лиг и имеет больше шансов на успех в хоккейной карьере.' },
  { icon: AdvantagesInternationalEducationIcon, title: 'Получение международного образования', desc: 'Игроки могут совмещать спортивную карьеру с обучением в престижных учебных заведениях за границей. ' },
  { icon: AdvantagesEmigrationOpportunitiesIcon, title: 'Возможность эмиграции в США и Канаду', desc: 'Получение рабочей визы при переходе в профессиональную лигу или диплом о высшем образовании даст возможность изменить миграционный статус и в дальнейшем получить гражданство другой страны.' },
  { icon: AdvantagesForeignLanguageLearningIcon, title: 'Изучение иностранного языка', desc: 'Англоязычная среда позволяет выучить иностранный язык проще и быстрее.' },
];

const steps = [
  { icon: StepsRequestIcon, label: 'Заявка' },
  { icon: StepsRatingIcon, label: 'Оценка уровня игрока' },
  { icon: StepsChoiceIcon, label: 'Предоставление вариантов на&nbsp;выбор' },
  { icon: StepsContractIcon, label: 'Подписание договора с&nbsp;командой&nbsp;и&nbsp;получение&nbsp;визы' },
  { icon: StepsSupervisingIcon, label: 'Курирование игрока — отслеживание прогресса, помощь в&nbsp;решении возникающих вопросов' },
];

const faq = [
  { question: 'Какие у нас перспективы?', answer: 'В зарубежных лигах отбор организован по спортивному принципу и на перспективы игрока влияет только его уровень игры. Результаты полностью зависят от хоккеиста, будет хорошо играть — продвинется выше.' },
  { question: 'Сколько это стоит? ', answer: 'Стоимость напрямую зависит от уровня хоккеиста и заинтересованности клуба в конкретном игроке. Чем выше уровень спортсмена – тем ниже цена. Мы определим точную стоимость после экспертной оценки уровня игрока и подберем подходящий вариант по вашим пожеланиям и бюджету.' },
  { question: 'А будет ли мой сын там играть? ', answer: 'Мы отправляем своих клиентов только в играющие пятерки, специально подбираем команду по уровню, чтобы хоккеист все время выступал среди равных и мог профессионально расти.' },
  { question: 'Реально ли получить визу?', answer: 'Да, команда подписывает контракт и присылает приглашение для игрока и на основании этих документов мы получаем визу.' },
  { question: 'Какие гарантии, что все будет именно так?', answer: 'Мы очень дорожим репутацией, и вы можете оценить качество нашей работы по отзывам наших клиентов. Все условия сотрудничества прописываем в договоре, и вы оплачиваете услуги только после заключения контакта с командой и получения визы.' },
  { question: 'Кто его встретит и позаботится?', answer: 'Сотрудники клуба встретят, отвезут к месту проживания, все покажут и ответят на возникшие вопросы. Игроку обязательно помогут сориентироваться и адаптироваться к бытовым условиям на месте.' },
  { question: 'А он будет понимать тренера?', answer: 'Игроки адаптируются к англоязычной среде в среднем за 2-4 недели, и за это время они постепенно втягиваются в процесс общения. Минимального уровня английского языка для этого достаточно, а хоккейная терминология – универсальная.' },
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
            "@id": "https://ghockeyagency.ru/services/find-job-abroad",
            "name": "Устройство хоккеистов за границу"
          }
        }
      ]
    }
  `,
};

const FaqStructuredData = {
  __html: `
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        ${faq.map(({ question, answer }) => `{ "@type": "Question", "name": "${question}", "acceptedAnswer": { "@type": "Answer", "text": "${answer}" } }`).join(', ')}
      ]
    }
  `,
};

function FindJobAbroad() {
  const height = useFullHeight();
  const [activeFaqItems, setActiveFaqItems] = useState({ 0: true });

  return (
    <>
      <Head
        title="Устройство хоккеистов за границу | хоккейное агентство «GHA»"
        desc="Хоккейное агентство Гришатова устраивает игроков в хоккейные лиги США и Канады. Поможем выбрать эффективную стратегию карьеры, которая будет соответствовать целям, возможностям и предпочтениям хоккеиста."
        page="/services/find-job-abroad"
        breadcrumbsData={BreadcrumbListStructuredData}
      >
        <script name="structured-data-faq" type="application/ld+json" dangerouslySetInnerHTML={FaqStructuredData} />
      </Head>
      <PageServices subPageKey="find-job-abroad">
        <section className="section section-intro" style={{ height }}>
          <div className="container">
            <div className="intro-content">
              <Breadcrumbs />
              <h1 className="h1 section-title">Устройство хоккеистов за границу</h1>
              <p className="intro-desc">Хоккейное агентство Гришатова устраивает игроков в юниорские, молодежные и профессиональные хоккейные лиги США и Канады. Мы определяем уровень игрока и предлагаем эффективную карьерную стратегию продвижения, которая будет соответствовать целям, возможностям и предпочтениям спортсмена. Наша экспертиза и опыт взаимодействия с хоккейными клубами позволяет предложить самый подходящий вариант развития карьеры за рубежом.</p>
            </div>
            <img className="intro-img" srcSet="/assets/img/services/common/1x/services-find-job-abroad-min.jpg, /assets/img/services/common/2x/services-find-job-abroad-min.jpg 2x" src="/assets/img/services/common/1x/services-find-job-abroad-min.jpg" alt="Услуги-Устройство заграницу" />
          </div>
        </section>
        <section className="section section-abroad-career-advantages">
          <div className="container">
            <h2 className="h2 section-title">Преимущества хоккейной карьеры за рубежом</h2>
            <ul className="abroad-career-advantages-list">
              {advantages.map(({ icon: Icon, title, desc }) => (
                <li className="abroad-career-advantages-list-item" key={title}>
                  <div className="advantage-icon-wrap">
                    <Icon className="advantage-icon" />
                  </div>
                  <div className="advantage-desc-wrap">
                    <div className="advantage-title" dangerouslySetInnerHTML={{ __html: title }} />
                    <div className="advantage-desc" dangerouslySetInnerHTML={{ __html: desc }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="section section-abroad-career-steps">
          <div className="container">
            <h2 className="h2 section-title with-overflow">Этапы устройства хоккеиста за границу</h2>
            <ul className="abroad-career-steps-list">
              {steps.map(({ icon: Icon, label }) => (
                <li className="abroad-career-steps-list-item" key={label}>
                  <Icon className="step-icon" />
                  <div className="step-label" dangerouslySetInnerHTML={{ __html: label }} />
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="section section-foreign-leagues">
          <div className="container">
            <h2 className="h2 section-title">Устраиваем в хоккейные лиги США и Канады</h2>
            <ul className="foreign-leagues-list">
              <li className="foreign-leagues-list-item">
                <img loading="lazy" className="league-img" srcSet="/assets/img/services/find-job-abroad/services-find-job-abroad-usa.png, /assets/img/services/find-job-abroad/services-find-job-abroad-usa.png 2x" src="/assets/img/services/find-job-abroad/services-find-job-abroad-usa.png" alt="Лиги США" />
              </li>
              <li className="foreign-leagues-list-item">
                <img loading="lazy" className="league-img" srcSet="/assets/img/services/find-job-abroad/services-find-job-abroad-canada.png, /assets/img/services/find-job-abroad/services-find-job-abroad-canada.png 2x" src="/assets/img/services/find-job-abroad/services-find-job-abroad-canada.png" alt="Лиги Канады" />
              </li>
            </ul>
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
                  <div className="faq-icon"/>
                  <div className="faq-question" dangerouslySetInnerHTML={{ __html: question }} />
                  <div className="faq-answer">
                    <div className="faq-answer-content" dangerouslySetInnerHTML={{ __html: answer }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <FeedbackSection title="Остались вопросы?" subtitle="Оставьте номер телефона, мы перезвоним и бесплатно проконсультируем" />
      </PageServices>
    </>
  );
}

export default FindJobAbroad;
