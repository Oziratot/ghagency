import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { PAGES } from '../../constants/pages';
import { PLAYERS } from '../../constants/players';
import { SERVICES } from '../../constants/services';
import { POSTS } from '../../constants/blog-posts';

const pagesNameByKey = PAGES.reduce((acc, page) => { acc[page.key] = page.label; return acc; }, {});
const playersNameByKey = PLAYERS.reduce((acc, player) => { acc[player.id] = player.name; return acc; }, {});
const servicesNameByKey = SERVICES.reduce((acc, service) => { acc[service.id] = service.label; return acc; }, {});
const postNameByKey = POSTS.reduce((acc, post) => { acc[post.id] = post.shortTitle || post.title; return acc; }, {});

const nameByKey = {
  ...pagesNameByKey,
  ...playersNameByKey,
  ...servicesNameByKey,
  ...postNameByKey,
  2022: 'Просмотр 2022',
  'training-camp-2022': 'Хоккейный лагерь в Москве 2022',
};

function BreadcrumbsItem({ href, label }) {
  return (
    <li>
      <Link href={href}>
        <a className="breadcrumbs-link" dangerouslySetInnerHTML={{ __html: label }} />
      </Link>
    </li>
  );
}

function Breadcrumbs() {
  const router = useRouter();
  const segments = useMemo(() => {
    const queryStartIndex = router.asPath.indexOf('?');
    return router.asPath.slice(1, queryStartIndex > -1 ? queryStartIndex : router.asPath.length).split('/');
  }, [router.asPath]);

  return (
    <ul className="breadcrumbs">
      <BreadcrumbsItem href="/" label="Главная" />
      {segments.map((key, i) => {
        const href = segments.slice(0, i + 1).reduce((acc, seg) => `${acc}/${seg}`, '');
        return <BreadcrumbsItem key={key} href={href} label={nameByKey[key]} />;
      })}
    </ul>
  );
}

export default Breadcrumbs;
