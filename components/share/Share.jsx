import styles from './share.module.scss';
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Upload,
} from '@mui/icons-material';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import { addPost, uploadFile } from '../../util/API';

const Share = ({ update }) => {
  const { data: session } = useSession();
  const { user } = session;
  const [file, setFile] = useState();
  const PF = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;

  const desc = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      description: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      data.append('file', file);

      const filename = await uploadFile(data);
      newPost.image = filename;
    }

    addPost(newPost);
    desc.current.value = '';
    update((pre) => !pre);
  };

  return (
    <div className={styles.share}>
      <div className={styles.shareWrapper}>
        <div className={styles.shareTop}>
          <div className={styles.shareProfileImg}>
            <Image
              layout='fill'
              objectFit='cover'
              src={
                user.profilePicture
                  ? `${PF}/person/${user.profilePicture}`
                  : `${PF}/person/noAvatar.webp`
              }
              alt=''
            />
          </div>
          <input
            placeholder={`What's in your mind ${user.name}?`}
            className={styles.shareInput}
            ref={desc}
          />
        </div>
        <hr className={styles.shareHr} />
        <form onSubmit={submitHandler} className={styles.shareBottom}>
          <div className={styles.shareOptions}>
            <label htmlFor='file' className={styles.shareOption}>
              <PermMedia htmlColor='tomato' className={styles.shareIcon} />
              <span className={styles.shareOptionText}>Photo or Video</span>
              <input
                type='file'
                style={{ display: 'none' }}
                accept='.png, .jpeg, .jpg, .webp'
                id='file'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className={styles.shareOption}>
              <Label htmlColor='blue' className={styles.shareIcon} />
              <span className={styles.shareOptionText}>Tag</span>
            </div>
            <div className={styles.shareOption}>
              <Room htmlColor='green' className={styles.shareIcon} />
              <span className={styles.shareOptionText}>Location</span>
            </div>
            <div className={styles.shareOption}>
              <EmojiEmotions
                htmlColor='goldenrod'
                className={styles.shareIcon}
              />
              <span className={styles.shareOptionText}>Feelings</span>
            </div>
          </div>
          <button type='submit' className={styles.shareButton}>
            Share
          </button>
        </form>
      </div>
    </div>
  );
};
export default Share;
