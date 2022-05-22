import styles from '../styles/me.module.scss';
import Navbar from '../components/Navbar/Navbar';
import { getSession } from 'next-auth/react';
import ProfileSetting from '../components/ProfileSetting/ProfileSetting';
import Head from 'next/head';

const settingPage = ({ user }) => {
  return (
    <>
      <Head>
        <title>Go Social | Account Setting</title>
      </Head>
      <Navbar user={user} />
      <ProfileSetting styles={styles} />
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session, user: session.user },
  };
};

export default settingPage;
