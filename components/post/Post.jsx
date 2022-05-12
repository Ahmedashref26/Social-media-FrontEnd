import styles from './post.module.scss';
import { MoreVert } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { format } from 'timeago.js';
import Link from 'next/link';
import { deletePost, likePost } from '../../util/API';
import { useSession } from 'next-auth/react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';

export default function Post({ post, update }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const open = Boolean(anchorEl);
  const PF = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;

  const {
    data: { user: currentUser },
  } = useSession();

  const { user } = post;
  const own = user._id === currentUser._id;

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [post.likes, currentUser._id]);

  const likeHandler = () => {
    likePost(post._id, currentUser._id);
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const deleteHandler = async () => {
    setLoading(true);
    setAnchorEl(null);
    const res = await deletePost(post._id);
    if (res) {
      update((pre) => !pre);
    }
    setLoading(false);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.post}>
      <div className={styles.postWrapper}>
        {loading && (
          <div className={styles.overlay}>
            <CircularProgress size={60} />
          </div>
        )}
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
          {own && (
            <div className={styles.postTopRight}>
              <MoreVert
                id='post-options'
                aria-controls={open ? 'post-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{ cursor: 'pointer' }}
              />
              <Menu
                id='post-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'post-options',
                }}
              >
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem onClick={deleteHandler}>Delete</MenuItem>
              </Menu>
            </div>
          )}
        </div>
        <div className={styles.postCenter}>
          <span className={styles.postText}>{post?.description}</span>
          {post.image && (
            <div className={styles.postImg}>
              <Image
                layout='fill'
                objectFit='cover'
                src={`${PF}/${post.image}`}
                alt=''
              />
            </div>
          )}
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
