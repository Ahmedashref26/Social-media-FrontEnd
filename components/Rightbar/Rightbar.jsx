import styles from './Rightbar.module.scss';
import ProfileRightbar from './ProfileRightbar';
import HomeRightbar from './HomeRightbar';

const Rightbar = ({ user, currentUser }) => {
  return (
    <div className={styles.rightbar}>
      <div className={styles.rightbarWrapper}>
        {user ? (
          <ProfileRightbar currentUser={currentUser} user={user} />
        ) : (
          <HomeRightbar />
        )}
      </div>
    </div>
  );
};
export default Rightbar;
