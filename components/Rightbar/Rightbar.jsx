import styles from './Rightbar.module.scss';
import ProfileRightbar from './ProfileRightbar';
import HomeRightbar from './HomeRightbar';

const Rightbar = ({ user }) => {
  return (
    <div className={styles.rightbar}>
      <div className={styles.rightbarWrapper}>
        {user ? <ProfileRightbar user={user} /> : <HomeRightbar />}
      </div>
    </div>
  );
};
export default Rightbar;
