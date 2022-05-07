import { useContext, useEffect } from 'react';
import Feed from '../components/Feed/Feed';
import Navbar from '../components/Navbar/Navbar';
import Rightbar from '../components/Rightbar/Rightbar';
import Sidebar from '../components/Sidebar/Sidebar';
import AuthContext from '../store/authContext';
import Styles from '../styles/Home.module.scss';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/react';

const HomePage = (props) => {
  return (
    <>
      <Navbar />
      <div className={Styles.homeContainer}>
        <Sidebar />
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
    props: { session },
  };
};

export default HomePage;
