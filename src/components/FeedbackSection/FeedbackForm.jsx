import moment from 'moment';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { IMaskMixin } from 'react-imask';
import PhoneInput from 'react-phone-input-2';
import ru from 'react-phone-input-2/lang/ru.json';
import { useSpring, animated } from 'react-spring';
import Link from 'next/link';
import classnames from 'classnames';
import { Formik, Field, ErrorMessage } from 'formik';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import * as Yup from 'yup';
import axios from 'axios';
import { stringify } from 'qs';
import useFbPixel from '../../utils/hooks/useFbPixel';
import useGTag from '../../utils/hooks/useGTag';
import useYMetrika from '../../utils/hooks/useYMetrika';
import Button from '../Button';
import SuccessIcon from './assets/success.svg';
// import useYMetrika from '../../utils/hooks/useYMetrika';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Поле обязательно'),
  phone: Yup.string().min(8, 'Телефон состоит минимум из 8 символов').matches(/^[\s\d-+()]*$/g, 'Телефон должен состоять только из цифр').required('Поле обязательно'),
  comment: Yup.string(),
});


const minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 40));
const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 6));

const validationSchemaSecondStep = Yup.object({
  fullName: Yup.string(),
  birthday: Yup.date().transform(function (value, originalValue) {
    // check to see if the previous transform already parsed the date
    if (this.isType(value)) return value;

    // the default coercion failed so let's try it with Moment.js instead
    value = moment(originalValue, 'DD.MM.YYYY');

    // if it's valid return the date object, otherwise return an `InvalidDate`
    return value.isValid() ? value.toDate() : new Date();
  }).max(maxDate).min(minDate),
  height: Yup.string(),
  weight: Yup.string(),
  email: Yup.string().email('Некорректный email'),
});

const noop = () => {};

const MaskInput = IMaskMixin(({ inputRef, ...props }) => (
  <input
    ref={inputRef}
    {...props}
  />
));

const PhoneInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const handleChange = useCallback((value) => {
    field.onChange({
      target: {
        name: field.name,
        value,
      },
    });
  }, []);

  return (
    <PhoneInput
      {...field}
      {...props}
      preferredCountries={['ru','by','kz']}
      country="ru"
      localization={ru}
      // type="tel"
      // mask="+{7} (000) 000-00-00"
      onChange={handleChange}
    />
  );
};

// const PhoneInputComponent = ({
//   field, // { name, value, onChange, onBlur }
//   form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
//   ...props
// }) => {
//   const handleAccept = useCallback((val, mask) => {
//     field.onChange({
//       target: {
//         name: field.name,
//         value: val,
//       },
//     });
//   }, []);
//   const handleFocus = useCallback(() => {
//     setLazy(false);
//   }, []);
//   const handleBlur = useCallback((e) => {
//     setLazy(true);
//     if (e.target.value === '+7 (' || e.target.value === '+7 (___) ___-__-__') {
//       e.target.value = '';
//       field.onChange({
//         target: {
//           name: field.name,
//           value: '',
//         },
//       });
//     }
//     field.onBlur(e);
//   }, []);
//   const [lazy, setLazy] = useState(true);
//
//   return (
//     <MaskInput
//       {...field}
//       {...props}
//       type="tel"
//       lazy={lazy}
//       mask="+{7} (000) 000-00-00"
//       onAccept={handleAccept}
//       onChange={noop}
//       onFocus={handleFocus}
//       onBlur={handleBlur}
//     />
//   );
// };

const OnlyTextInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const handleChange = useCallback((e) => {
    const { name, onChange } = field;
    const value = e.target.value.replace(/[^A-Za-zА-Яа-я\s-.]/ig, '');
    onChange({ target: { name, value } });
  }, []);

  return (
    <input type="text" {...field} onChange={handleChange} {...props} />
  );
};

const OnlyDigitsInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const handleChange = useCallback((e) => {
    const { name, onChange } = field;
    const value = e.target.value.replace(/[^0-9.,]/ig, '');
    onChange({ target: { name, value } });
  }, [field]);

  return (
    <input type="text" maxLength={3} {...field} onChange={handleChange} {...props} />
  );
};

function FeedbackForm({ topic, firstSubmitLabel, secondSubmitLabel }) {
  const ym = useYMetrika();
  const gtag = useGTag();
  const fbq = useFbPixel();
  const textareaRef = useRef(null);
  const formRef = useRef(null);
  const stepBlockContainerRef = useRef(null);
  const firstNameRef = useRef('');
  const [formWrapStyle, setFormWrapStyle] = useSpring(() => ({ height: 'auto' }));
  const [step, setStep] = useState(1);
  const [successfullySent, setSuccessfullySent] = useState(false);

  const handleSubmit = useCallback((values, { isSubmitting, setSubmitting }) => {
    if (isSubmitting || step === 2 || successfullySent) return;

    const safeValues = { ...values, topic };

    if (formRef.current['gha-a-n-t-i-s-p-a-m-f-i-e-l-d'].checked) {
      safeValues['gha-a-n-t-i-s-p-a-m-f-i-e-l-d'] = 1;
    }

    firstNameRef.current = values.firstName;

    axios.post('/feedback-form.php', stringify(safeValues), { 'Content-Type': 'application/x-www-form-urlencoded' })
      .then(() => {
        ym('reachGoal', 'FORM_FIRST_STEP_SUBMITTED');
        gtag('event', 'FORM_FIRST_STEP_SUBMITTED');
        fbq('track', 'FORM_FIRST_STEP_SUBMITTED');
        setSubmitting(false);
        setStep(2);
      })
      .catch(() => {
        setSubmitting(false);
      });
  }, [step, topic, successfullySent]);

  const handleSecondStepSubmit = useCallback((values, { isSubmitting, setSubmitting }) => {
    if (isSubmitting || successfullySent) return;

    const safeValues = { ...values, topic };

    if (formRef.current['gha-a-n-t-i-s-p-a-m-f-i-e-l-d'].checked) {
      safeValues['gha-a-n-t-i-s-p-a-m-f-i-e-l-d'] = 1;
    }

    if (Object.values(values).some(val => val)) {
      safeValues.firstName = firstNameRef.current;

      axios.post('/feedback-form-2.php', stringify(safeValues), { 'Content-Type': 'application/x-www-form-urlencoded' })
        .then(() => {
          ym('reachGoal', 'FORM_SECOND_STEP_SUBMITTED');
          gtag('event', 'FORM_SECOND_STEP_SUBMITTED');
          fbq('track', 'FORM_SECOND_STEP_SUBMITTED');
          setSubmitting(false);
          setSuccessfullySent(true);
        })
        .catch(() => {
          setSubmitting(false);
        });
    } else {
      setSuccessfullySent(true);
    }
  }, [topic, successfullySent]);

  const handleDateFocus = useCallback((e) => {
    e.currentTarget.type = 'date';
  }, []);
  const handleDateBlur = useCallback((e) => {
    if (!e.currentTarget.value) {
      e.currentTarget.type = 'text';
    }
  }, []);

  const setInputElementHeight = useCallback(() => {
    if (textareaRef) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`; // https://stackoverflow.com/a/25621277/7140603 (+1 it seems fix problem of shaking after first letter entering)
    }
  }, []);

  useEffect(() => {
    setFormWrapStyle({ height: stepBlockContainerRef.current.offsetHeight });

    function onResize() {
      setFormWrapStyle({ height: stepBlockContainerRef.current.offsetHeight });
    }

    window.addEventListener('resize', onResize, false);

    return () => {
      window.removeEventListener('resize', onResize, false);
    };
  }, []);

  return (
    <animated.div className={classnames('feedback-form-wrap', { 'successfully-sent': successfullySent })} style={formWrapStyle}>
      <SwitchTransition mode="out-in">
        <CSSTransition
          classNames="fade"
          key={successfullySent + step}
          addEndListener={(node, done) => {
            setFormWrapStyle({ height: node.offsetHeight });
            node.addEventListener("transitionend", done, false);
          }}
        >
          <div className="step-block-container" ref={stepBlockContainerRef}>
            <div className="step-block">
              {!successfullySent && step === 1 && (
                <Formik
                  initialValues={{ firstName: '', phone: '', comment: '' }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  validateOnMount
                >
                  {({ handleSubmit, handleReset, handleChange, handleBlur, values, errors, touched, isValid, isSubmitting }) => (
                    <form className="feedback-form" onSubmit={handleSubmit} onReset={handleReset} ref={formRef}>
                      <div className="form-row">
                        <div className="field-wrap width-50">
                          <Field name="firstName" component={OnlyTextInputComponent} placeholder="Ваше имя" className={classnames({ invalid: errors.firstName && touched.firstName })} />
                          <ErrorMessage name="firstName" component="div" className="field-error" />
                        </div>
                        <div className="field-wrap width-50">
                          <Field name="phone" component={PhoneInputComponent} placeholder="Телефон" className={classnames({ invalid: errors.phone && touched.phone })} />
                          <ErrorMessage name="phone" component="div" className="field-error" />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="field-wrap">
                          <textarea
                            rows="1"
                            name="comment"
                            ref={textareaRef}
                            onChange={(e) => {
                              handleChange(e);
                              setInputElementHeight();
                            }}
                            onBlur={handleBlur}
                            placeholder="Комментарий"
                            value={values.comment}
                          />
                          {/*<Field name="comment" type="text" as="textarea" placeholder="Комментарий" />*/}
                          <ErrorMessage name="comment" component="div" className="field-error" />
                        </div>
                      </div>

                      <input type="checkbox" name="gha-a-n-t-i-s-p-a-m-f-i-e-l-d" value="1" style={{ display: 'none' }} tabIndex="-1" autoComplete="none" />

                      <div className="form-row consent-and-submit">
                        <div className="consent-personal-data-processing">
                          <span>Нажимая на кнопку, вы даете согласие на обработку </span>
                          <Link href="/legal/agreement">
                            <a className="blue-link">персональных&nbsp;данных</a>
                          </Link>
                        </div>
                        <Button disabled={!isValid || step === 2 || successfullySent} loading={isSubmitting} type="submit">{firstSubmitLabel}</Button>
                      </div>
                    </form>
                  )}
                </Formik>
              )}

              {!successfullySent && step === 2 && (
                <Formik
                  initialValues={{ fullName: '', birthday: '', height: '', weight: '', email: '' }}
                  validationSchema={validationSchemaSecondStep}
                  onSubmit={handleSecondStepSubmit}
                  validateOnMount
                >
                  {({ handleSubmit, handleReset, handleChange, handleBlur, values, errors, touched, isValid, isSubmitting }) => (
                    <form className="feedback-form" onSubmit={handleSubmit} onReset={handleReset} ref={formRef}>
                      <div className="form-title">Анкета игрока</div>

                      <div className="form-multi-row">
                        <div className="field-wrap width-60 width-100-xs">
                          <Field name="fullName" component={OnlyTextInputComponent} placeholder="ФИО игрока" className={classnames({ invalid: errors.fullName && touched.fullName })} />
                          <ErrorMessage name="fullName" component="div" className="field-error" />
                        </div>
                        <div className="field-wrap width-40 width-50-xs width-100-xxs">
                          <Field name="birthday" type="date" placeholder="Дата рождения" className={classnames({ invalid: errors.birthday && touched.birthday })} onFocus={handleDateFocus} onBlur={handleDateBlur} />
                          <ErrorMessage name="birthday" component="div" className="field-error" />
                        </div>

                        <div className="field-wrap width-20 width-25-xs width-50-xxs">
                          <Field name="height" component={OnlyDigitsInputComponent} placeholder="Рост" className={classnames({ invalid: errors.height && touched.height })} />
                          <ErrorMessage name="height" component="div" className="field-error" />
                        </div>
                        <div className="field-wrap width-20 width-25-xs width-50-xxs">
                          <Field name="weight" component={OnlyDigitsInputComponent} placeholder="Вес" className={classnames({ invalid: errors.weight && touched.weight })} />
                          <ErrorMessage name="weight" component="div" className="field-error" />
                        </div>

                        <div className="field-wrap width-60 width-75-xs width-100-xxs">
                          <Field name="email" type="text" placeholder="Email для связи" className={classnames({ invalid: errors.email && touched.email })} />
                          <ErrorMessage name="email" component="div" className="field-error" />
                        </div>
                      </div>

                      <input type="checkbox" name="gha-a-n-t-i-s-p-a-m-f-i-e-l-d" value="1" style={{ display: 'none' }} tabIndex="-1" autoComplete="none" />

                      <div className="form-row consent-and-submit">
                        <div className="consent-personal-data-processing">
                          <span>Нажимая на кнопку, вы даете согласие на обработку </span>
                          <Link href="/legal/agreement">
                            <a className="blue-link">персональных&nbsp;данных</a>
                          </Link>
                        </div>
                        <Button disabled={!isValid || successfullySent} loading={isSubmitting} type="submit">{secondSubmitLabel}</Button>
                      </div>
                    </form>
                  )}
                </Formik>
              )}

              {successfullySent && (
                <div className="success-block">
                  <SuccessIcon className="success-block-icon" />
                  <div className="success-block-title">Ваша заявка принята</div>
                  <div className="success-block-desc">Мы свяжемся с Вами в&nbsp;ближайшее&nbsp;время!</div>
                </div>
              )}
            </div>
          </div>
        </CSSTransition>
      </SwitchTransition>
    </animated.div>
  );
}

FeedbackForm.propTypes = {
  topic: PropTypes.string,
  firstSubmitLabel: PropTypes.string,
  secondSubmitLabel: PropTypes.string,
};

FeedbackForm.defaultProps = {
  topic: 'Закажите бесплатную консультацию',
  firstSubmitLabel: 'Заказать',
  secondSubmitLabel: 'Отправить',
};

export default memo(FeedbackForm);
