import styles from './online.module.scss';
import Image from 'next/image';

const Online = ({ user }) => {
  return (
    <li className={styles.rightbarFriend}>
      <div className={styles.rightbarProfileImgContainer}>
        <div className={styles.rightbarProfileImg}>
          <Image layout='fill' objectFit='cover' src={user.profilePicture} alt='' />
        </div>
        <span className={styles.rightbarOnline}></span>
      </div>
      <span className={styles.rightbarUsername}>{user.username}</span>
    </li>
  );
};

export default Online;
