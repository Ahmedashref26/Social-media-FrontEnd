import Image from 'next/image';
import styles from './Conversation.module.scss';

const Conversation = ({ conversation, currentUser }) => {
  const PF = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;

  const friend = conversation.members.find(
    (member) => member._id !== currentUser._id
  );

  return (
    <div className={styles.conversation}>
      <div className={styles.conversationImg}>
        <Image
          src={
            friend.profilePicture
              ? `${PF}/person/${friend.profilePicture}`
              : `${PF}/person/noAvatar.webp`
          }
          width={200}
          height={200}
          alt=''
        />
      </div>
      <span className={styles.conversationName}>{friend?.name}</span>
    </div>
  );
};
export default Conversation;
