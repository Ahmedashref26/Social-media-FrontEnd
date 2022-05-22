import Image from 'next/image';
import { Users } from '../../util/DummyData';
import Online from '../Online/Online';
import FriendsOnline from '../FriendsOnline/FriendsOnline';
import styles from './HomeRightbar.module.scss';

const HomeRightbar = () => {
  const PF = process.env.PUBLIC_FOLDER;

  return (
    <>
      <div className={styles.birthdayContainer}>
        <div className={styles.birthdayImg}>
          <Image
            layout='fill'
            objectFit='cover'
            src={`${PF}/gift.png`}
            alt=''
          />
        </div>
        <span className={styles.birthdayText}>
          <b>You</b> and <b>4 other friends</b> have a birhday today.
        </span>
      </div>
      <div className={styles.rightbarAd}>
        <Image layout='fill' objectFit='cover' src={`${PF}/ad.jpg`} alt='' />
      </div>
      <h4 className={styles.rightbarTitle}>Contacts</h4>
      <ul className={styles.rightbarFriendList}>
        {/* {Users.map((u) => (
          <Online key={u.id} user={u} />
        ))} */}
        <FriendsOnline />
      </ul>
    </>
  );
};

export default HomeRightbar;
