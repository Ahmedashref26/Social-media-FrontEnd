import { Chat, Notifications, Person } from '@mui/icons-material';
import Image from 'next/image';
import styles from './Navbar.module.scss';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import Search from '../Search/Search';
import SocketContext from '../../store/socketContext';
import { useContext, useEffect, useState } from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';

const Navbar = ({ user }) => {
  const PF = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;
  const socket = useContext(SocketContext);
  const [open, setOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // useEffect(() => {
  //   socket.off('getNotification').on('getNotification', (notification) => {
  //     console.log(notification);
  //   });
  // }, [socket]);

  return (
    <div className='navbar'>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLeft}>
          <Link href='/'>
            <>
              <span className={styles.navbarLeftLogo}>HamadaSocial</span>
              <span className={styles.navbarLeftLogoImage}>HS</span>
            </>
          </Link>
        </div>
        <div className={styles.navbarCenter}>
          <Search />
        </div>
        <div className={styles.navbarRight}>
          <div className={styles.navbarIcons}>
            <Link href='/messenger'>
              <div className={styles.navbarIconItem}>
                <Chat />
                <span className={styles.navbarIconBadge}>2</span>
              </div>
            </Link>
            <div
              onClick={(e) => setShowNotification(e.currentTarget)}
              className={styles.navbarIconItem}
            >
              <Notifications />
              <span className={styles.navbarIconBadge}>1</span>
            </div>
          </div>
          <div
            className={styles.navbarUser}
            onClick={(e) => setOpen(e.currentTarget)}
          >
            <div className={styles.navbarImg}>
              <Image
                src={
                  (user.profilePicture && `${PF}/${user.profilePicture}`) ||
                  `${PF}/noAvatar.webp`
                }
                alt='profile picture'
                layout='fill'
                objectFit='cover'
              />
            </div>
            <span>{user.name.split(' ')[0]}</span>
          </div>
          <Menu
            sx={{ mt: '45px' }}
            id='avatar-menu'
            anchorEl={open}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={!!open}
            onClose={(e) => setOpen(false)}
          >
            <MenuItem onClick={(e) => setOpen(false)}>
              <Link href={`/profile/${user.username}`}>
                <Typography textAlign='center'>Profile</Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={(e) => setOpen(false)}>
              <Link href={`/me`}>
                <Typography textAlign='center'>Account</Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={() => signOut({ redirect: '/' })}>
              <Typography textAlign='center'>Logout</Typography>
            </MenuItem>
          </Menu>
          <Menu
            sx={{ mt: '45px' }}
            id='avatar-menu'
            anchorEl={showNotification}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={!!showNotification}
            onClose={(e) => setShowNotification(false)}
          >
            <MenuItem onClick={(e) => setShowNotification(false)}>
              <div>Laura liked your post : asdlfjaslfadfj</div>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
