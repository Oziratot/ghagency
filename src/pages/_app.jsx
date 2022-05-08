import 'react-phone-input-2/lib/bootstrap.css';
import '../styles/app.scss';
import React from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
import Root from '../components/Root';

const resetHashScroll = {
  __html: `
    if (window.location.hash || window.location.search.startsWith('?order')) {
      if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
      }
    }
  `,
};

const YMetrikaScript = {
  __html: `
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
     m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
     (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
     ym(65395597, "init", {
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true,
          webvisor:true
     });
  `,
};

const GTagScript = {
  __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-171685923-1');
  `,
};

const FbPixelScript = {
  __html: `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window,document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
     fbq('init', '1750567085095416');
     fbq('track', 'PageView');
  `,
};

const LogoStructuredData = {
  __html: `
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "url": "https://ghockeyagency.ru/",
      "logo": "https://ghockeyagency.ru/assets/img/GHA-og-logo.png"
    }
  `,
};

const OrganizationStructuredData = {
  __html: `
    {
      "@context": "https://schema.org",
      "@type": "SportsOrganization",
      "image": ["https://ghockeyagency.ru/assets/img/GHA-og-logo.png"],
      "@id": "https://ghockeyagency.ru/#organization",
      "name": "Grishatov Hockey Agency",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ул. Новоостаповская, 5 стр. 2",
        "addressLocality": "Москва",
        "addressRegion": "МО",
        "postalCode": "115088",
        "addressCountry": "Russia"
      },
      "url": "https://ghockeyagency.ru/contacts",
      "telephone": "+79160791214",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      ]
    }
  `,
};

class App extends NextApp {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Хоккейное Агентство «Grishatov Hockey Agency»</title>
          <meta name="description" content="Хоккейное агентство предоставляет услуги по поиску и трудоустройству спортсменов в хоккейные лиги Канады и США. Мы представляем интересы игроков от 14 лет до 21 года в юниорских и молодежных лигах Северной Америки." />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          <meta name="format-detection" content="telephone=no" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" />
          {/*<link rel="icon" type="image/png" href="/favicon/favicon.png" />*/}
          <link rel="preload" href="/fonts/montserrat-v14-latin_cyrillic-regular.woff2" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/montserrat-v14-latin_cyrillic-italic.woff2" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/montserrat-v14-latin_cyrillic-500.woff2" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/montserrat-v14-latin_cyrillic-600.woff2" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/montserrat-v14-latin_cyrillic-700.woff2" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/bebas-neue-v1-latin-regular.woff2" as="font" crossOrigin="" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="https://ghockeyagency.ru/assets/img/GHA-og-logo.png" />
          <meta name="twitter:title" content="Хоккейное Агентство «Grishatov Hockey Agency»" />
          <meta name="twitter:image:alt" content="Хоккейное Агентство «Grishatov Hockey Agency»" />
          <meta name="twitter:description" content="Хоккейное агентство предоставляет услуги по поиску и трудоустройству спортсменов в хоккейные лиги Канады и США. Мы представляем интересы игроков от 14 лет до 21 года в юниорских и молодежных лигах Северной Америки." />
          <meta name="og-title" property="og:title" content="Хоккейное Агентство «Grishatov Hockey Agency»" />
          <meta name="og-description" property="og:description" content="Хоккейное агентство предоставляет услуги по поиску и трудоустройству спортсменов в хоккейные лиги Канады и США. Мы представляем интересы игроков от 14 лет до 21 года в юниорских и молодежных лигах Северной Америки." />
          <meta name="og-url" property="og:url" content="https://ghockeyagency.ru" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="GHA" />
          <meta property="og:image" content="https://ghockeyagency.ru/assets/img/GHA-og-logo.png" />
          <meta property="og:image:secure_url" content="https://ghockeyagency.ru/assets/img/GHA-og-logo.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:type" content="image/png" />
          {process.env.NODE_ENV === 'production' && (
            <>
              <meta name="yandex-verification" content="02bb13a9cb19fdbc" />
              <script async src="https://www.googletagmanager.com/gtag/js?id=UA-171685923-1" />
              <script type="text/javascript" dangerouslySetInnerHTML={GTagScript} />
              <script type="text/javascript" dangerouslySetInnerHTML={YMetrikaScript} />
              <script type="text/javascript" dangerouslySetInnerHTML={FbPixelScript} />
            </>
          )}
          <script type="text/javascript" dangerouslySetInnerHTML={resetHashScroll} />
          <script name="structured-data-logo" type="application/ld+json" dangerouslySetInnerHTML={LogoStructuredData} />
          <script name="structured-data-organization" type="application/ld+json" dangerouslySetInnerHTML={OrganizationStructuredData} />
        </Head>

        <Root Component={Component} pageProps={pageProps} />

        {process.env.NODE_ENV === 'production' && <noscript><div><img src="https://mc.yandex.ru/watch/65395597" style={{ position: 'absolute', left: -9999 }} alt="" /></div></noscript>}
        {process.env.NODE_ENV === 'production' && <noscript><img height="1" width="1" src="https://www.facebook.com/tr?id=1750567085095416&ev=PageView&noscript=1" alt="" /></noscript>}
      </>
    );
  }
}

export default App;
