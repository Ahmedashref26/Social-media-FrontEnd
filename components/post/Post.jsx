import styles from './post.module.scss';
import { MoreVert } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { format } from 'timeago.js';
import Link from 'next/link';
import { likePost } from '../../util/API';
import { useSession } from 'next-auth/react';

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;

  console.log(post.image);
  const {
    data: { user: currentUser },
  } = useSession();

  const { user } = post;

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [post.likes, currentUser._id]);

  const likeHandler = () => {
    likePost(post._id, currentUser._id);
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className={styles.post}>
      <div className={styles.postWrapper}>
        <div className={styles.postTop}>
          <div className={styles.postTopLeft}>
            <Link href={`/profile/${user.username}`}>
              <div className={styles.postProfileImg}>
                <Image
                  layout='fill'
                  objectFit='cover'
                  src={
                    (user.profilePicture &&
                      `${PF}/person/${user.profilePicture}`) ||
                    `${PF}/person/noAvatar.webp`
                  }
                  alt=''
                />
              </div>
            </Link>
            <span className={styles.postUsername}>{user.name}</span>
            <span className={styles.postDate}>{format(post.createdAt)}</span>
          </div>
          <div className={styles.postTopRight}>
            <MoreVert />
          </div>
        </div>
        <div className={styles.postCenter}>
          <span className={styles.postText}>{post?.description}</span>
          <div className={styles.postImg}>
            <Image
              layout='fill'
              objectFit='cover'
              src={`${PF}/${post.image}`}
              alt=''
            />
          </div>
        </div>
        <div className={styles.postBottom}>
          <div className={styles.postBottomLeft}>
            <div className={styles.likeIcon}>
              <Image
                layout='fill'
                objectFit='cover'
                src={`${PF}/like.png`}
                onClick={likeHandler}
                alt=''
              />
            </div>
            <div className={styles.likeIcon}>
              <Image
                layout='fill'
                objectFit='cover'
                src={`${PF}/heart.png`}
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
