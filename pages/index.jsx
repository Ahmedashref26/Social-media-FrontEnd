import Feed from '../components/Feed/Feed';
import Navbar from '../components/Navbar/Navbar';
import Rightbar from '../components/Rightbar/Rightbar';
import Sidebar from '../components/Sidebar/Sidebar';
import Styles from '../styles/Home.module.scss';

const HomePage = () => {
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

export default HomePage;
