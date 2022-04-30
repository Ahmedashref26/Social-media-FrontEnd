import styles from '../../styles/Signup.module.scss';

const SignupPage = () => {
  return (
    <div className={styles.signup}>
      <div className={styles.signupWrapper}>
        <div className={styles.signupLeft}>
          <h3 className={styles.signupLogo}>Lamasocial</h3>
          <span className={styles.signupDesc}>
            Connect with friends and the world around you on HamadaSocial.
          </span>
        </div>
        <div className={styles.signupRight}>
          <div className={styles.signupBox}>
            <input placeholder='Username' className={styles.signupInput} />
            <input placeholder='Email' className={styles.signupInput} />
            <input placeholder='Password' className={styles.signupInput} />
            <input
              placeholder='Password Again'
              className={styles.signupInput}
            />
            <button className={styles.signupButton}>Sign Up</button>
            <button className={styles.signupRegisterButton}>
              Log into Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
