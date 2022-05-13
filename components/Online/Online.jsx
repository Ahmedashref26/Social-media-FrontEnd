import styles from './online.module.scss';
import Image from 'next/image';

const Online = ({ user }) => {
  const PF = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;

  return (
    <li className={styles.rightbarFriend}>
      <div className={styles.rightbarProfileImgContainer}>
        <div className={styles.rightbarProfileImg}>
          <Image
            layout='fill'
            objectFit='cover'
            src={
              user.profilePicture
                ? `${PF}/person/${user.profilePicture}`
                : `${PF}/person/noAvatar.webp`
            }
            alt=''
          />
        </div>
        <span className={styles.rightbarOnline}></span>
      </div>
      <span className={styles.rightbarUsername}>{user.name}</span>
    </li>
  );
};

export default Online;
