import Link from 'next/link';
import React from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';
import FeedbackSection from '../../components/FeedbackSection/FeedbackSection';
import Head from '../../components/Head';
import PageServices from '../../components/PageServices';
import { SERVICES } from '../../constants/services';
import useFullHeight from '../../utils/hooks/useFullHeight';

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
        }
      ]
    }
  `,
};

function Services() {
  const height = useFullHeight();

  return (
    <>
      <Head
        title="Услуги хоккейного агента Гришатова Егора | хоккейное агентство «GHA»"
        desc="Гришатов Егор - международный хоккейный агент и основатель Grishatov Hockey Agency. В рекрутинге с 2015 года. Официальный партнер 19 хоккейных клубов США и Канады."
        page="/services"
        breadcrumbsData={BreadcrumbListStructuredData}
      />
      <PageServices subPageKey="main">
        <section className="section section-intro" style={{ height }}>
          <div className="container">
            <div className="intro-content">
              <Breadcrumbs />
              <h1 className="h1 section-title">Услуги хоккейного агента</h1>
              <p className="intro-desc">Хоккейное агентство Гришатова продвигает игроков в юниорские, молодежные и профессиональные хоккейные лиги США и Канады. Организовываем просмотры хоккеистов в Москве и на крупнейших спортивных мероприятиях в Северной Америке. Мы консультируем, устраиваем и курируем игроков, а также помогаем подготовиться к продолжению хоккейной карьеры за&nbsp;рубежом.</p>
            </div>
            <img className="intro-img" srcSet="/assets/img/services/common/1x/services-main-min.jpg, /assets/img/services/common/2x/services-main-min.jpg 2x" src="/assets/img/services/common/1x/services-main-min.jpg" alt="Услуги-Главная" />
          </div>
        </section>
        <section className="section section-service-previews">
          <div className="container">
            <ul className="service-previews-list">
              {SERVICES.map(({ id, label, previewImgSrcSet, previewDesc }) => {
                return (
                  <li className="service-previews-list-item" key={id}>
                    <Link href={`/services/${id}`}>
                      <a className="service-preview-link">
                        <div className="service-preview-link-content">
                          <div className="preview-img">
                            <img srcSet={previewImgSrcSet} src={previewImgSrcSet.split(',')[0]} alt={label} />
                          </div>
                          <div className="preview-title-with-desc">
                            <h2 className="h3 preview-title" dangerouslySetInnerHTML={{ __html: label }} />
                            <p className="preview-desc" dangerouslySetInnerHTML={{ __html: previewDesc }} />
                            <div className="more-details">Подробнее</div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <FeedbackSection title="Закажите бесплатную консультацию" subtitle="Мы подробно расскажем о карьерных&nbsp;перспективах Вашего&nbsp;ребенка" />
      </PageServices>
    </>
  );
}

export default Services;
