import styles from './Rightbar.module.scss';
import ProfileRightbar from './ProfileRightbar';
import HomeRightbar from './HomeRightbar';

const Rightbar = ({ profile }) => {
  return (
    <div className={styles.rightbar}>
      <div className={styles.rightbarWrapper}>
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};
export default Rightbar;
