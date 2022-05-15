import PasswordForm from './PasswordForm';
import ProfileForm from './ProfileForm';

const ProfileSetting = ({ styles }) => {
  return (
    <main className={styles.main}>
      <div className={styles['user-view']}>
        <div className={styles['user-view__content']}>
          <ProfileForm styles={styles} />
          <div className={styles.line}>&nbsp;</div>
          <PasswordForm styles={styles} />
        </div>
      </div>
    </main>
  );
};
export default ProfileSetting;
