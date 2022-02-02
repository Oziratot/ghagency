import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useGTag from '../utils/hooks/useGTag';
import useQuerySection from '../utils/hooks/useQuerySection';

function PageServices({ subPageKey, children }) {
  const gtag = useGTag();

  useEffect(() => {
    gtag('event', 'screen_view', {
      app_name: 'GHA',
      screen_name: `services-${subPageKey}`,
    });
  }, []);

  useQuerySection();

  return (
    <div className={`page-services page-services-${subPageKey}`}>
      {children}
    </div>
  );
}

PageServices.propTypes = {
  subPageKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default PageServices;
