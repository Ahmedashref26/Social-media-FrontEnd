import { Posts } from '../../util/DummyData';
import Post from '../post/Post';
import Share from '../share/Share';
import styles from './Feed.module.scss';

const Feed = () => {
  return (
    <div className={styles.feed}>
      <div className={styles.feedWrapper}>
        <Share />
        {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
};
export default Feed;
