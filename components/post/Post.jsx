import styles from './post.module.scss';
import { MoreVert } from '@mui/icons-material';
import { useState } from 'react';
import Image from 'next/image';
import { Users } from '../../util/DummyData';

export default function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className={styles.post}>
      <div className={styles.postWrapper}>
        <div className={styles.postTop}>
          <div className={styles.postTopLeft}>
            <div className={styles.postProfileImg}>
              <Image
                layout='fill'
                objectFit='cover'
                src={
                  Users.filter((u) => u.id === post?.userId)[0].profilePicture
                }
                alt=''
              />
            </div>
            <span className={styles.postUsername}>
              {Users.filter((u) => u.id === post?.userId)[0].username}
            </span>
            <span className={styles.postDate}>{post.date}</span>
          </div>
          <div className={styles.postTopRight}>
            <MoreVert />
          </div>
        </div>
        <div className={styles.postCenter}>
          <span className={styles.postText}>{post?.desc}</span>
          <div className={styles.postImg}>
            <Image layout='fill' objectFit='cover' src={post.photo} alt='' />
          </div>
        </div>
        <div className={styles.postBottom}>
          <div className={styles.postBottomLeft}>
            <div className={styles.likeIcon}>
              <Image
                layout='fill'
                objectFit='cover'
                src='/assets/like.png'
                onClick={likeHandler}
                alt=''
              />
            </div>
            <div className={styles.likeIcon}>
              <Image
                layout='fill'
                objectFit='cover'
                src='/assets/heart.png'
                onClick={likeHandler}
                alt=''
              />
            </div>
            <span className={styles.postLikeCounter}>
              {like} people like it
            </span>
          </div>
          <div className={styles.postBottomRight}>
            <span className={styles.postCommentText}>
              {post.comment} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
