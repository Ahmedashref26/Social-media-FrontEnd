import styles from './CloseFriend.module.scss';
import Image from 'next/image';

export default function CloseFriend({ user }) {
  return (
    <li className={styles.sidebarFriend}>
      <div className={styles.sidebarFriendImg}>
        <Image
          layout='fill'
          objectFit='cover'
          src={user.profilePicture}
          alt=''
        />
      </div>
      <span className={styles.sidebarFriendName}>{user.username}</span>
    </li>
  );
}
