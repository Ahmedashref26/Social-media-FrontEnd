import Image from 'next/image';
import { format } from 'timeago.js';

const CommentList = ({ styles, comments }) => {
  const PF = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;

  return (
    <div className={styles.commentList}>
      {comments &&
        comments.length > 0 &&
        comments.map((comment) => (
          <li className={styles.commentItem} key={comment._id}>
            <div className={styles.commentProfileImg}>
              <Image
                layout='fill'
                objectFit='cover'
                src={
                  (comment.user.profilePicture &&
                    `${PF}/${comment.user.profilePicture}`) ||
                  `${PF}/noAvatar.webp`
                }
                alt=''
              />
            </div>
            <div className={styles.commentContent}>
              <div className={styles.commentContentTitle}>
                <span className={styles.commentContentAuthor}>
                  {comment.user.name}
                </span>
                <span className={styles.commentContentStamp}>
                  {format(comment.createdAt)}
                </span>
              </div>
              <p className={styles.commentContentText}>{comment.comment}</p>
            </div>
          </li>
        ))}
    </div>
  );
};
export default CommentList;
