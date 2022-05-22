import styles from './Friend.module.scss';
import Image from 'next/image';

export default function Friend({ user }) {
  const PF = process.env.PUBLIC_FOLDER;

  return (
    <li className={styles.sidebarFriend}>
      <div className={styles.sidebarFriendImg}>
        <Image
          layout='fill'
          objectFit='cover'
          src={
            user.profilePicture
              ? `${PF}/${user.profilePicture}`
              : `${PF}/noAvatar.webp`
          }
          alt=''
        />
      </div>
      <span className={styles.sidebarFriendName}>{user.name}</span>
    </li>
  );
}
