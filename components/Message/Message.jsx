import styles from './Message.module.scss';
import { format } from 'timeago.js';
import Image from 'next/image';

export default function Message({ message, own }) {
  const PF = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;
  return (
    <div
      className={own ? `${styles.message} ${styles.own}` : `${styles.message}`}
    >
      <div className={styles.messageTop}>
        {!own && (
          <div className={styles.messageImg}>
            <Image
              src={
                message.sender.profilePicture
                  ? `${PF}/${message.sender.profilePicture}`
                  : `${PF}/noAvatar.webp`
              }
              alt=''
              width={200}
              height={200}
            />
          </div>
        )}
        <p className={styles.messageText}>{message.text}</p>
      </div>
      <div className={styles.messageBottom}>{format(message.createdAt)}</div>
    </div>
  );
}
