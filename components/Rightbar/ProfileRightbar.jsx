import styles from './ProfileRightbar.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { followUser, getFriends } from '../../util/API';
import Link from 'next/link';
import { getSession, useSession } from 'next-auth/react';
import { Add, Remove } from '@mui/icons-material';
import { reloadSession } from '../../util/reload';
import Alert from '../Alert/Alert';

const ProfileRightbar = ({ user, currentUser }) => {
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [message, setMessage] = useState();

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
    if (user._id) getFriends(user._id).then((friends) => setFriends(friends));
  }, [user._id]);

  const handleFollow = async (e) => {
    setMessage(null);
    const res = await followUser(user._id, followed ? 'unfollow' : 'follow');
    if (res.error) {
      setMessage({ status: 'error', msg: res.error });
      return;
    }
    setFollowed((pre) => !pre);
    reloadSession();
  };

  const PF = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;
  return (
    <>
      {message && <Alert variant={message.status} msg={message.msg} />}
      {currentUser._id !== user._id && (
        <button onClick={handleFollow} className={styles.rightbarFollowButton}>
          {followed ? 'unfollow' : 'Follow'}
          {followed ? <Remove /> : <Add />}
        </button>
      )}
      <h4 className={styles.rightbarTitle}>User information</h4>
      <div className={styles.rightbarInfo}>
        <div className={styles.rightbarInfoItem}>
          <span className={styles.rightbarInfoKey}>City:</span>
          <span className={styles.rightbarInfoValue}>{user.city}</span>
        </div>
        <div className={styles.rightbarInfoItem}>
          <span className={styles.rightbarInfoKey}>From:</span>
          <span className={styles.rightbarInfoValue}>{user.from}</span>
        </div>
        <div className={styles.rightbarInfoItem}>
          <span className={styles.rightbarInfoKey}>Relationship:</span>
          <span className={styles.rightbarInfoValue}>
            {user.relation === 1
              ? 'Single'
              : user.relation === 2
              ? 'Married'
              : '_'}
          </span>
        </div>
      </div>
      <h4 className={styles.rightbarTitle}>Following Users</h4>
      <div className={styles.rightbarFollowings}>
        {friends &&
          friends.length > 0 &&
          friends.map((friend) => (
            <Link key={friend._id} href={`/profile/${friend.username}`}>
              <div className={styles.rightbarFollowing}>
                <div className={styles.rightbarFollowingImg}>
                  <Image
                    layout='fill'
                    objectFit='cover'
                    src={
                      friend.profilePicture
                        ? `${PF}/${friend.profilePicture}`
                        : `${PF}/noAvatar.webp`
                    }
                    alt=''
                  />
                </div>
                <span className={styles.rightbarFollowingName}>
                  {friend.name}
                </span>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default ProfileRightbar;
