import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getFriends, getTwoUsersConv } from '../../util/API';
import styles from './ChatOnline.module.scss';

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const PF = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;

  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    if (currentId) getFriends(currentId).then((friends) => setFriends(friends));
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(
      friends.filter((f) => onlineUsers.map((u) => u.userId).includes(f._id))
    );
  }, [friends, onlineUsers]);

  const handleClick = (user) => {
    getTwoUsersConv(user._id).then((conv) => setCurrentChat(conv));
  };

  return (
    <div className={styles.chatOnline}>
      {onlineFriends.map((o) => (
        <div
          key={o._id}
          className={styles.chatOnlineFriend}
          onClick={() => handleClick(o)}
        >
          <div className={styles.chatOnlineImgContainer}>
            <div className={styles.chatOnlineImg}>
              <Image
                src={
                  o?.profilePicture
                    ? `${PF}/${o.profilePicture}`
                    : `${PF}/noAvatar.webp`
                }
                alt=''
                width={200}
                height={200}
              />
            </div>
            <div className={styles.chatOnlineBadge}></div>
          </div>
          <span className={styles.chatOnlineName}>{o?.username}</span>
        </div>
      ))}
    </div>
  );
};
export default ChatOnline;
