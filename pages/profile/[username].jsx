import styles from '../../styles/Profile.module.scss';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Feed from '../../components/Feed/Feed';
import Rightbar from '../../components/Rightbar/Rightbar';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getUser } from '../../util/API';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import Head from 'next/head';

const ProfilePage = ({ user: currentUser }) => {
  const [user, setUser] = useState({});
  const router = useRouter();
  const { username } = router.query;
  const PF = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;

  useEffect(() => {
    getUser(username, 'username')
      .then((data) => setUser(data.user))
      .catch((err) => console.log(err));
  }, [username]);

  return (
    <>
      <Head>
        <title>Go Social | Profile</title>
      </Head>
      <Navbar user={currentUser} />
      <div className={styles.profile}>
        <Sidebar user={currentUser} />
        <div className={styles.profileRight}>
          <div className={styles.profileRightTop}>
            <div className={styles.profileCover}>
              <div className={styles.profileCoverImg}>
                <Image
                  layout='fill'
                  objectFit='cover'
                  src={user.coverPicture || `${PF}/post/6.jpeg`}
                  alt=''
                />
              </div>
              <div className={styles.profileUserImg}>
                <Image
                  layout='fill'
                  objectFit='cover'
                  src={
                    user.profilePicture
                      ? `${PF}/${user.profilePicture}`
                      : `${PF}/noAvatar.webp`
                  }
                  alt=''
                />
              </div>
            </div>
            <div className={styles.profileInfo}>
              <h4 className={styles.profileInfoName}>{user.name}</h4>
              <span className={styles.profileInfoDesc}>{user.desc}</span>
            </div>
          </div>
          <div className={styles.profileRightBottom}>
            <Feed user={user} />
            <Rightbar currentUser={currentUser} user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      user: session.user,
    },
  };
};

export default ProfilePage;
