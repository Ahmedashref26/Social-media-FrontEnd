import styles from '../../styles/Profile.module.scss';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Feed from '../../components/Feed/Feed';
import Rightbar from '../../components/Rightbar/Rightbar';
import Image from 'next/image';

const ProfilePage = () => {
  return (
    <>
      <Navbar />
      <div className={styles.profile}>
        <Sidebar />
        <div className={styles.profileRight}>
          <div className={styles.profileRightTop}>
            <div className={styles.profileCover}>
              <div className={styles.profileCoverImg}>
                <Image
                  layout='fill'
                  objectFit='cover'
                  src='/assets/post/3.jpeg'
                  alt=''
                />
              </div>
              <div className={styles.profileUserImg}>
                <Image
                  layout='fill'
                  objectFit='cover'
                  src='/assets/person/7.jpeg'
                  alt=''
                />
              </div>
            </div>
            <div className={styles.profileInfo}>
              <h4 className={styles.profileInfoName}>Safak Kocaoglu</h4>
              <span className={styles.profileInfoDesc}>Hello my friends!</span>
            </div>
          </div>
          <div className={styles.profileRightBottom}>
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
