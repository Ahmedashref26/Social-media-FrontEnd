import styles from '../../styles/Login.module.scss';
import { useRef, useState } from 'react';
import { getSession, signIn, useSession } from 'next-auth/react';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Alert from '../../components/Alert/Alert';
import Head from 'next/head';

const LoginPage = () => {
  const email = useRef();
  const password = useRef();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
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
    <>
      <Head>
        <title>Go Social | Login</title>
      </Head>
      <div className={styles.login}>
        {error && <Alert variant='error' msg={error} />}
        <div className={styles.loginWrapper}>
          <div className={styles.loginLeft}>
            <h3 className={styles.loginLogo}>GoSocial</h3>
            <span className={styles.loginDesc}>
              Connect with friends and the world around you on GoSocial.
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
              {/* <span className={styles.loginForgot}>Forgot Password?</span> */}
              <Link href='/signup'>
                <span className={styles.loginRegisterButton}>
                  Create a New Account
                </span>
              </Link>

              {/* {error && <div className={styles.loginError}>{error}</div>} */}
            </form>
          </div>
        </div>
      </div>
    </>
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
