import styles from './ProfileRightbar.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { followUser, getFriends } from '../../util/API';
import Link from 'next/link';
import { getSession, useSession } from 'next-auth/react';
import { Add, Remove } from '@mui/icons-material';
import { reloadSession } from '../../util/reload';

const ProfileRightbar = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(false);
  const {
    data: { user: currentUser },
  } = useSession();
  // getSession().then((session) =>
  //   console.log('getSession', session?.user?.followings)
  // );

  console.log('useSession:', currentUser.followings);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, []);

  useEffect(() => {
    if (user._id) getFriends(user._id).then((friends) => setFriends(friends));
  }, [user._id]);

  const handleFollow = (e) => {
    followUser(user._id, followed ? 'unfollow' : 'follow');
    setFollowed((pre) => !pre);
    reloadSession();
  };

  const PF = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;
  return (
    <>
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
      <h4 className={styles.rightbarTitle}>User friends</h4>
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
                      friend
                        ? `${PF}/person/${friend.profilePicture}`
                        : `${PF}/person/noAvatar.webp`
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
