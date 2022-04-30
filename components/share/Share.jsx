import styles from './share.module.scss';
import { PermMedia, Label, Room, EmojiEmotions } from '@mui/icons-material';
import Image from 'next/image';

const Share = () => {
  return (
    <div className={styles.share}>
      <div className={styles.shareWrapper}>
        <div className={styles.shareTop}>
          <div className={styles.shareProfileImg}>
            <Image
              layout='fill'
              objectFit='cover'
              src='/assets/person/1.jpeg'
              alt=''
            />
          </div>
          <input
            placeholder="What's in your mind Safak?"
            className={styles.shareInput}
          />
        </div>
        <hr className={styles.shareHr} />
        <div className={styles.shareBottom}>
          <div className={styles.shareOptions}>
            <div className={styles.shareOption}>
              <PermMedia htmlColor='tomato' className={styles.shareIcon} />
              <span className={styles.shareOptionText}>Photo or Video</span>
            </div>
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
          <button className={styles.shareButton}>Share</button>
        </div>
      </div>
    </div>
  );
};
export default Share;
