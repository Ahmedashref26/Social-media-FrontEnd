import { Chat, Notifications, Person, Search } from '@mui/icons-material';
import Image from 'next/image';
import styles from './Navbar.module.scss';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();
  const { user } = session;
  const PF = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;

  return (
    <div className='navbar'>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLeft}>
          <Link href='/'>
            <span className={styles.navbarLeftLogo}>HamadaSocial</span>
          </Link>
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
            <span
              className={styles.navbarLink}
              onClick={() => signOut({ redirect: '/' })}
            >
              Logout
            </span>
          </div>
          <div className={styles.navbarIcons}>
            <div className={styles.navbarIconItem}>
              <Person />
              <span className={styles.navbarIconBadge}>1</span>
            </div>
            <Link href='/messenger'>
              <div className={styles.navbarIconItem}>
                <Chat />
                <span className={styles.navbarIconBadge}>2</span>
              </div>
            </Link>
            <div className={styles.navbarIconItem}>
              <Notifications />
              <span className={styles.navbarIconBadge}>1</span>
            </div>
          </div>
          <Link href={`/profile/${user.username}`}>
            <div className={styles.navbarImg}>
              <Image
                src={
                  (user.profilePicture &&
                    `${PF}/person/${user.profilePicture}`) ||
                  `${PF}/person/noAvatar.webp`
                }
                alt='profile picture'
                layout='fill'
                objectFit='cover'
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
