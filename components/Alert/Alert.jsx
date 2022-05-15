import { useState, useEffect } from 'react';
import styles from './Alert.module.scss';

const Alert = ({ variant, msg, time = 3 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, time * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {show && (
        <div className={`${styles.alert} ${styles[`alert--${variant}`]}`}>
          {msg}
        </div>
      )}
    </>
  );
};

export default Alert;
