import { Chat, Notifications, Person, Search } from '@mui/icons-material';
import Image from 'next/image';
import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLeft}>
          <span className={styles.navbarLeftLogo}>HamadaSocial</span>
        </div>
        <div className={styles.navbarCenter}>
          <div className={styles.navbarSearchbar}>
            <Search className={styles.navbarSearchIcon} />
            <input
              placeholder='Search for friends, posts, or videos'
              className={styles.navbarInput}
            />
          </div>
        </div>
        <div className={styles.navbarRight}>
          <div className={styles.navbarLinks}>
            <span className={styles.navbarLink}>Home</span>
            <span className={styles.navbarLink}>Timeline</span>
          </div>
          <div className={styles.navbarIcons}>
            <div className={styles.navbarIconItem}>
              <Person />
              <span className={styles.navbarIconBadge}>1</span>
            </div>
            <div className={styles.navbarIconItem}>
              <Chat />
              <span className={styles.navbarIconBadge}>2</span>
            </div>
            <div className={styles.navbarIconItem}>
              <Notifications />
              <span className={styles.navbarIconBadge}>1</span>
            </div>
          </div>
          <div className={styles.navbarImg}>
            <Image
              src='/assets/person/1.jpeg'
              alt='profile picture'
              layout='fill'
              objectFit='cover'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
