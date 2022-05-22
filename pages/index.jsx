import Feed from '../components/Feed/Feed';
import Navbar from '../components/Navbar/Navbar';
import Rightbar from '../components/Rightbar/Rightbar';
import Sidebar from '../components/Sidebar/Sidebar';
import Styles from '../styles/Home.module.scss';
import { getSession } from 'next-auth/react';
import Head from 'next/head';

const HomePage = ({ user }) => {
  return (
    <>
      <Head>
        <title>Go Social | NewsFeed</title>
      </Head>
      <Navbar user={user} />
      <div className={Styles.homeContainer}>
        <Sidebar user={user} />
        <Feed />
        <Rightbar />
      </div>
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

export default HomePage;
