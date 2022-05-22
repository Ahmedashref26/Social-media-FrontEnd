import styles from '../../styles/Signup.module.scss';
import { useRef, useState } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';
import { signup } from '../../util/API';
import Alert from '../../components/Alert/Alert';
import Head from 'next/head';

const SignupPage = () => {
  const email = useRef();
  const username = useRef();
  const name = useRef();
  const password = useRef();
  const passwordConfirm = useRef();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const enteredEmail = email.current.value;
    const enteredUsername = username.current.value;
    const enteredName = name.current.value;
    const enteredPass = password.current.value;
    const enteredConfirm = passwordConfirm.current.value;

    if (enteredPass !== enteredConfirm) {
      setLoading(false);
      setError('password and confirm password not matched!');
      return;
    }

    const signupResults = await signup({
      username: enteredUsername,
      name: enteredName,
      email: enteredEmail,
      password: enteredPass,
    });

    if (signupResults.error) {
      setLoading(false);
      setError(
        signupResults.error || 'Something went wrong. Please try agian!'
      );
      return;
    }

    const LoginResult = await signIn('credentials', {
      redirect: false,
      email: enteredEmail,
      password: enteredPass,
    });
    if (!LoginResult.error) {
      setLoading(false);
      setError(null);
      router.push('/');
    } else {
      setLoading(false);
      setError(LoginResult.error);
    }
  };
  return (
    <>
      <Head>
        <title>Go Social | Sign up</title>
      </Head>
      <div className={styles.signup}>
        {error && <Alert variant='error' msg={error} />}
        <div className={styles.signupWrapper}>
          <div className={styles.signupLeft}>
            <h3 className={styles.signupLogo}>GoSocial</h3>
            <span className={styles.signupDesc}>
              Connect with friends and the world around you on GoSocial.
            </span>
          </div>
          <div className={styles.signupRight}>
            <form onSubmit={submitHandler} className={styles.signupBox}>
              <input
                placeholder='Username'
                ref={username}
                required
                className={styles.signupInput}
              />
              <input
                placeholder='Name'
                ref={name}
                required
                className={styles.signupInput}
              />
              <input
                placeholder='Email'
                type='email'
                className={styles.signupInput}
                ref={email}
                required
              />
              <input
                placeholder='Password'
                type='password'
                className={styles.signupInput}
                ref={password}
                minLength='6'
                required
              />
              <input
                placeholder='Password Again'
                className={styles.signupInput}
                type='password'
                ref={passwordConfirm}
                minLength='6'
                required
              />
              <button className={styles.signupButton}>
                {isLoading ? (
                  <CircularProgress size={26} color='inherit' />
                ) : (
                  'Sign Up'
                )}
              </button>

              <Link href='/login'>
                <span className={styles.signupRegisterButton}>
                  Log into Account
                </span>
              </Link>
              {/* {error && <div className={styles.signupError}>{error}</div>} */}
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

export default SignupPage;
