import styles from '../../styles/Login.module.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { getSession, signIn, useSession } from 'next-auth/react';
import authContext from '../../store/authContext';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LoginPage = () => {
  const email = useRef();
  const password = useRef();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn('credentials', {
      redirect: false,
      email: email.current.value,
      password: password.current.value,
    });
    if (!result.error) {
      setLoading(false);
      setError(null);
      router.push('/');
    } else {
      setLoading(false);
      setError(result.error);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginLeft}>
          <h3 className={styles.loginLogo}>HamadaSocial</h3>
          <span className={styles.loginDesc}>
            Connect with friends and the world around you on HamadaSocial.
          </span>
        </div>
        <div className={styles.loginRight}>
          <form onSubmit={submitHandler} className={styles.loginBox}>
            <input
              placeholder='Email'
              type='email'
              className={styles.loginInput}
              ref={email}
              required
            />
            <input
              placeholder='Password'
              type='password'
              className={styles.loginInput}
              required
              minLength='6'
              ref={password}
            />
            <button className={styles.loginButton}>
              {isLoading ? (
                <CircularProgress size={26} color='inherit' />
              ) : (
                'Log In'
              )}
            </button>
            <span className={styles.loginForgot}>Forgot Password?</span>
            <Link href='/signup'>
              <span className={styles.loginRegisterButton}>
                Create a New Account
              </span>
            </Link>
            {error && <div className={styles.loginError}>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: { session },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
