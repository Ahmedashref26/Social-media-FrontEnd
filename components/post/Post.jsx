import styles from './post.module.scss';
import { Cancel, MoreVert } from '@mui/icons-material';
import { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { format } from 'timeago.js';
import Link from 'next/link';
import { deletePost, likePost, updatePost, uploadFile } from '../../util/API';
import { useSession } from 'next-auth/react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import Comments from '../Comments/Comments';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import SocketContext from '../../store/socketContext';

export default function Post({ post, update }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [file, setFile] = useState(post?.image);
  const [desc, setDesc] = useState(post?.description);
  const [showComment, setShowComment] = useState(false);

  const { socket } = useContext(SocketContext);

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
    !own &&
      socket.emit('sendNotification', {
        sender: currentUser.name,
        receiver: user._id,
        type: isLiked ? 'disliked' : 'liked',
        desc:
          post.description.length > 20
            ? `${post.description.substring(0, 20)}...`
            : post.description,
      });
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

  const editHandler = () => {
    setAnchorEl(null);
    setEditing(true);
  };

  const updateHandler = async () => {
    const updatedPost = { description: desc };

    if (file && file !== post.image) {
      const data = new FormData();
      data.append('file', file);
      const filename = await uploadFile(data);
      if (filename) updatedPost.image = filename;
    }

    if (!updatedPost.image && post.image) updatedPost.image = post.image;

    const res = await updatePost(post._id, updatedPost);
    if (res) {
      setFile(null);
      setEditing(false);
      update((pre) => !pre);
    }
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
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
                    (user.profilePicture && `${PF}/${user.profilePicture}`) ||
                    `${PF}/noAvatar.webp`
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
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  'aria-labelledby': 'post-options',
                }}
              >
                <MenuItem onClick={editHandler}>Edit</MenuItem>
                <MenuItem onClick={deleteHandler}>Delete</MenuItem>
              </Menu>
            </div>
          )}
        </div>
        <div className={styles.postCenter}>
          {!editing && (
            <span className={styles.postText}>{post?.description}</span>
          )}
          {editing && (
            <input
              value={desc}
              className={styles.postInput}
              onChange={(e) => setDesc(e.target.value)}
            />
          )}
          {post.image && !editing && (
            <div className={styles.postImg}>
              <Image
                layout='fill'
                objectFit='cover'
                src={`${PF}/${post.image}`}
                alt=''
              />
            </div>
          )}
          {editing && file && (
            <div className={styles.postImgContainer}>
              <div className={styles.postImg}>
                {file === post.image && (
                  <Image
                    layout='fill'
                    objectFit='cover'
                    src={`${PF}/${post.image}`}
                    alt=''
                  />
                )}
                {file !== post.image && (
                  <Image
                    layout='fill'
                    objectFit='cover'
                    alt=''
                    src={URL.createObjectURL(file)}
                  />
                )}
              </div>
              <Cancel
                className={styles.postImgCancel}
                onClick={() => setFile(null)}
              />
            </div>
          )}
        </div>
        {!editing && (
          <>
            <div className={styles.postBottom}>
              <div className={styles.postBottomLeft}>
                <div className={styles.likeIcon}>
                  {isLiked && (
                    <FavoriteIcon color='error' onClick={likeHandler} />
                  )}
                  {!isLiked && <FavoriteBorderIcon onClick={likeHandler} />}
                </div>
                <span className={styles.postLikeCounter}>
                  {like} people like it
                </span>
              </div>
              <div className={styles.postBottomRight}>
                <span
                  onClick={() => setShowComment(true)}
                  className={styles.postCommentText}
                >
                  <InsertCommentOutlinedIcon /> comments
                </span>
              </div>
            </div>
            {showComment && (
              <Comments
                post={post._id}
                desc={post.description}
                postAuthor={user._id}
                currentUser={currentUser}
                show={setShowComment}
              />
            )}
          </>
        )}
        {editing && (
          <div className={styles.postBottomEdit}>
            <div className={styles.postBottomLeft}>
              <label htmlFor='postfile' className={styles.postButton}>
                <span>Upload Image</span>
                <input
                  type='file'
                  style={{ display: 'none' }}
                  accept='.png, .jpeg, .jpg, .webp'
                  id='postfile'
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </div>
            <div className={styles.postBottomRight}>
              <button onClick={updateHandler} className={styles.postButton}>
                Save Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
