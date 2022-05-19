import styles from './Comments.module.scss';
import CommentList from './CommentList';
import NewComment from './NewComment';
import { useEffect, useState } from 'react';
import { getComments } from '../../util/API';
import CircularProgress from '@mui/material/CircularProgress';

const Comments = ({ currentUser, post, show, desc, postAuthor }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getComments(post).then((comments) => comments && setComments(comments));
    setLoading(false);
  }, []);

  return (
    <div className={styles.comment}>
      <NewComment
        styles={styles}
        post={post}
        user={currentUser}
        desc={desc}
        receiver={postAuthor}
        setComments={setComments}
      />
      {loading && (
        <div style={{ color: '#999', margin: '10px 0', textAlign: 'center' }}>
          <CircularProgress size={25} color='inherit' />
        </div>
      )}
      {!loading && (
        <>
          <CommentList styles={styles} post={post} comments={comments} />
          <span onClick={() => show(false)} className={styles.commentHide}>
            Hide Comments
          </span>
        </>
      )}
    </div>
  );
};
export default Comments;
