import { useState } from 'react';
import Alert from '../Alert/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { updatePass } from '../../util/API';

const PasswordForm = ({ styles }) => {
  const [currPassword, setCurrPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setMessage({ status: 'error', msg: "Password doesn't match" });
      setLoading(false);
      return;
    }

    const updatedPassword = {
      currentPassword: currPassword,
      password,
    };

    const res = await updatePass(updatedPassword);
    setLoading(false);
    setMessage(res);
    setCurrPassword('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className={styles['user-view__form-container']}>
      {message && <Alert variant={message.status} msg={message.msg} time={7} />}
      <h2 className={`${styles['heading-secondary']} ${styles['ma-bt-md']}`}>
        Password change
      </h2>
      <form
        onSubmit={submitHandler}
        className={`${styles.form} ${styles['form-user-settings']}`}
      >
        <div className={styles.form__group}>
          <label className={styles.form__label} htmlFor='password-current'>
            Current password
          </label>
          <input
            className={styles.form__input}
            id='password-current'
            type='password'
            placeholder='••••••••'
            required='required'
            minLength='8'
            value={currPassword}
            onChange={(e) => setCurrPassword(e.target.value)}
          />
        </div>
        <div className={styles.form__group}>
          <label className={styles.form__label} htmlFor='password'>
            New password
          </label>
          <input
            className={styles.form__input}
            id='password'
            type='password'
            placeholder='••••••••'
            required='required'
            minLength='8'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={`${styles.form__group} ${styles['ma-bt-lg']}`}>
          <label className={styles.form__label} htmlFor='password-confirm'>
            Confirm password
          </label>
          <input
            className={styles.form__input}
            id='password-confirm'
            type='password'
            placeholder='••••••••'
            required='required'
            minLength='8'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={`${styles.form__group} ${styles.right}`}>
          <button
            className={`${styles.btn} ${styles['btn--small']} ${styles['btn--green']}`}
          >
            {loading ? (
              <div style={{ padding: '0 47.1px' }}>
                <CircularProgress size={16} color='inherit' />
              </div>
            ) : (
              'Save settings'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default PasswordForm;
