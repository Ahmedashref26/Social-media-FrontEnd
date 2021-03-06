import { useEffect, useState } from 'react';
import { getUserPosts, getUserTimeline } from '../../util/API';
import Post from '../post/Post';
import Share from '../share/Share';
import styles from './Feed.module.scss';
import { useSession } from 'next-auth/react';

const Feed = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [update, setUpdate] = useState(false);

  const { data } = useSession();
  const currentUser = data?.user;

  useEffect(() => {
    if (user?._id)
      getUserPosts(user._id).then((data) =>
        setPosts(
          data.sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt))
        )
      );
    if (!user)
      getUserTimeline().then((data) =>
        setPosts(
          data.sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt))
        )
      );
  }, [user, update]);

  return (
    <div className={styles.feed}>
      <div className={styles.feedWrapper}>
        {(!user || currentUser?._id === user._id) && (
          <Share update={setUpdate} />
        )}
        {posts &&
          posts.length > 0 &&
          posts.map((p) => <Post key={p._id} post={p} update={setUpdate} />)}
        {posts.length === 0 && (
          <div className={styles.feedNoPosts}>
            There is no posts share your own posts or follow other users to see
            there posts
          </div>
        )}
      </div>
    </div>
  );
};
export default Feed;
