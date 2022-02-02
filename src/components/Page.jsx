import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useGTag from '../utils/hooks/useGTag';
import useQuerySection from '../utils/hooks/useQuerySection';

function Page({ pageKey, children }) {
  const gtag = useGTag();

  useEffect(() => {
    gtag('event', 'screen_view', {
      app_name: 'GHA',
      screen_name: `services-${pageKey}`,
    });
  }, []);

  useQuerySection();

  return (
    <div className={`page-${pageKey}`}>
      {children}
    </div>
  );
}

Page.propTypes = {
  pageKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Page;
