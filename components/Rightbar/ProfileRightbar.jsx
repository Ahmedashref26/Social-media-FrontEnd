import styles from './ProfileRightbar.module.scss';
import Image from 'next/image';

const ProfileRightbar = () => {
  return (
    <>
      <h4 className={styles.rightbarTitle}>User information</h4>
      <div className={styles.rightbarInfo}>
        <div className={styles.rightbarInfoItem}>
          <span className={styles.rightbarInfoKey}>City:</span>
          <span className={styles.rightbarInfoValue}>New York</span>
        </div>
        <div className={styles.rightbarInfoItem}>
          <span className={styles.rightbarInfoKey}>From:</span>
          <span className={styles.rightbarInfoValue}>Madrid</span>
        </div>
        <div className={styles.rightbarInfoItem}>
          <span className={styles.rightbarInfoKey}>Relationship:</span>
          <span className={styles.rightbarInfoValue}>Single</span>
        </div>
      </div>
      <h4 className={styles.rightbarTitle}>User friends</h4>
      <div className={styles.rightbarFollowings}>
        <div className={styles.rightbarFollowing}>
          <div className={styles.rightbarFollowingImg}>
            <Image
              layout='fill'
              objectFit='cover'
              src='/assets/person/1.jpeg'
              alt=''
            />
          </div>
          <span className={styles.rightbarFollowingName}>John Carter</span>
        </div>
        <div className={styles.rightbarFollowing}>
          <div className={styles.rightbarFollowingImg}>
            <Image
              layout='fill'
              objectFit='cover'
              src='/assets/person/2.jpeg'
              alt=''
            />
          </div>
          <span className={styles.rightbarFollowingName}>John Carter</span>
        </div>
        <div className={styles.rightbarFollowing}>
          <div className={styles.rightbarFollowingImg}>
            <Image
              layout='fill'
              objectFit='cover'
              src='/assets/person/3.jpeg'
              alt=''
            />
          </div>
          <span className={styles.rightbarFollowingName}>John Carter</span>
        </div>
        <div className={styles.rightbarFollowing}>
          <div className={styles.rightbarFollowingImg}>
            <Image
              layout='fill'
              objectFit='cover'
              src='/assets/person/4.jpeg'
              alt=''
            />
          </div>
          <span className={styles.rightbarFollowingName}>John Carter</span>
        </div>
        <div className={styles.rightbarFollowing}>
          <div className={styles.rightbarFollowingImg}>
            <Image
              layout='fill'
              objectFit='cover'
              src='/assets/person/5.jpeg'
              alt=''
            />
          </div>
          <span className={styles.rightbarFollowingName}>John Carter</span>
        </div>
        <div className={styles.rightbarFollowing}>
          <div className={styles.rightbarFollowingImg}>
            <Image
              layout='fill'
              objectFit='cover'
              src='/assets/person/6.jpeg'
              alt=''
            />
          </div>
          <span className={styles.rightbarFollowingName}>John Carter</span>
        </div>
      </div>
    </>
  );
};

export default ProfileRightbar;
