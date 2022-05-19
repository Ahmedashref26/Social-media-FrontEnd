import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import SocketContext from '../../store/socketContext';
import { getFriends, getTwoUsersConv } from '../../util/API';
import styles from './FriendsOnline.module.scss';

const FriendsOnline = ({ setCurrentChat }) => {
  const PF = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;
  const { onlineUsers, userId } = useContext(SocketContext);

  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    if (userId) getFriends(userId).then((friends) => setFriends(friends));
  }, [userId]);

  useEffect(() => {
    onlineUsers &&
      onlineUsers.length &&
      setOnlineFriends(
        friends.filter((f) => onlineUsers.map((u) => u.userId).includes(f._id))
      );
  }, [friends, onlineUsers]);

  const handleClick = (user) => {
    // getTwoUsersConv(user._id).then((conv) => setCurrentChat(conv));
  };

  return (
    <div className={styles.chatOnline}>
      {friends.map((o) => (
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
            {onlineFriends.indexOf(o) !== -1 && (
              <div className={styles.chatOnlineBadge}></div>
            )}
          </div>
          <span className={styles.chatOnlineName}>{o?.name}</span>
        </div>
      ))}
    </div>
  );
};
export default FriendsOnline;
