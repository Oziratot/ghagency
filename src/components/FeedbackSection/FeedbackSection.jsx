import { useRouter } from 'next/router';
import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { getCoords } from '../../utils/getCoords';
import FeedbackForm from './FeedbackForm';

function FeedbackSection({ title, subtitle, children, firstSubmitLabel }) {
  const sectionRef = useRef(null);
  const router = useRouter();
  const { query: { order } } = router;

  useEffect(() => {
    if (typeof order !== 'undefined') {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const header = document.getElementsByClassName('header')[0];
          window.scrollTo(0, getCoords(sectionRef.current).top - header.offsetHeight + (window.innerWidth > 1023 ? 32 : 0));
        }, 10);
      });
    }
  }, [order]);

  return (
    <section className="section section-feedback" ref={sectionRef}>
      <div className="container-mini">
        <h2 className="h2" dangerouslySetInnerHTML={{ __html: title }} />
        {children}
        {subtitle && <p className="h3" dangerouslySetInnerHTML={{ __html: subtitle }} />}
        <FeedbackForm topic={`${title}\n${subtitle}`} firstSubmitLabel={firstSubmitLabel} />
      </div>
    </section>
  );
}

FeedbackSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  firstSubmitLabel: PropTypes.string,
};

export default memo(FeedbackSection);
