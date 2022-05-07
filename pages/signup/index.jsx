import styles from '../../styles/Signup.module.scss';
import { useEffect, useRef, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';
import { signup } from '../../util/API';

const SignupPage = () => {
  const email = useRef();
  const username = useRef();
  const name = useRef();
  const password = useRef();
  const passwordConfirm = useRef();
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (session) {
      router.replace('/');
    }
  }, [session]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

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

    if (signupResults.status === 'error' || signupResults.status === 'failed') {
      setLoading(false);
      setError('Something went wrong. Please try agian!');
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
    <div className={styles.signup}>
      <div className={styles.signupWrapper}>
        <div className={styles.signupLeft}>
          <h3 className={styles.signupLogo}>HamadaSocial</h3>
          <span className={styles.signupDesc}>
            Connect with friends and the world around you on HamadaSocial.
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
            {error && <div className={styles.signupError}>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
