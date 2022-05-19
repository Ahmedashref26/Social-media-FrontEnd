import styles from './Sidebar.module.scss';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { RssFeed, Chat, Person, Logout } from '@mui/icons-material';
import Friend from '../Friend/Friend';
import { Users } from '../../util/DummyData';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const Sidebar = ({ user }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarWrapper}>
        <ul className={styles.sidebarList}>
          <Link href='/'>
            <li className={styles.sidebarListItem}>
              <RssFeed className={styles.sidebarIcon} />
              <span className={styles.sidebarListItemText}>Feed</span>
            </li>
          </Link>
          <Link href={`/profile/${user.username}`}>
            <li className={styles.sidebarListItem}>
              <Person className={styles.sidebarIcon} />
              <span className={styles.sidebarListItemText}>Profile</span>
            </li>
          </Link>
          <Link href='/messenger'>
            <li className={styles.sidebarListItem}>
              <Chat className={styles.sidebarIcon} />
              <span className={styles.sidebarListItemText}>Chats</span>
            </li>
          </Link>
          <Link href='/me'>
            <li className={styles.sidebarListItem}>
              <ManageAccountsIcon className={styles.sidebarIcon} />
              <span className={styles.sidebarListItemText}>Account</span>
            </li>
          </Link>
          <li
            onClick={() => signOut({ redirect: '/' })}
            className={styles.sidebarListItem}
          >
            <Logout className={styles.sidebarIcon} />
            <span className={styles.sidebarListItemText}>Logout</span>
          </li>
        </ul>
        {/* <hr className={styles.sidebarHr} /> */}
        {/* <ul className={styles.sidebarFriendList}>
          {Users.map((u) => (
            <Friend key={u.id} user={u} />
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default Sidebar;
