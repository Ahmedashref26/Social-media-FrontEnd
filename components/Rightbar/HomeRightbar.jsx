import Image from 'next/image';
import { Users } from '../../util/DummyData';
import Online from '../Online/Online';
import styles from './HomeRightbar.module.scss';

const HomeRightbar = () => {
  const PF = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;

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
          <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
        </span>
      </div>
      <div className={styles.rightbarAd}>
        <Image layout='fill' objectFit='cover' src={`${PF}/ad.png`} alt='' />
      </div>
      <h4 className={styles.rightbarTitle}>Online Friends</h4>
      <ul className={styles.rightbarFriendList}>
        {Users.map((u) => (
          <Online key={u.id} user={u} />
        ))}
      </ul>
    </>
  );
};

export default HomeRightbar;
