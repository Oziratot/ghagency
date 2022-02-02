import React from 'react';
import { useRouter } from 'next/router';
import Button from '../components/Button';
import useFullHeight from '../utils/hooks/useFullHeight';

function Custom404() {
  const router = useRouter();
  const height = useFullHeight();

  return (
    <div className="page-404" style={{ height }}>
      <div className="page-404-content">
        <p className="title-404">404</p>
        <h1 className="h2">Приносим извинения, но мы не смогли найти запрашиваемую страницу</h1>
        <Button type="button" onClick={() => router.push('/services/training-camps')}>Вернуться на главную</Button>
      </div>
    </div>
  );
}

export default Custom404;
