import Image from 'next/image';
import { useRef } from 'react';
import { addComment } from '../../util/API';

const NewComment = ({ styles, user, post, setComments }) => {
  const commentInput = useRef();
  const PF = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;

  const submitHandler = async (e) => {
    e.preventDefault();

    const comment = commentInput.current.value;
    const res = await addComment(post, { comment });
    if (res) {
      setComments((pre) => [...pre, res]);
      commentInput.current.value = '';
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.commentNew}>
      <div className={styles.commentProfileImg}>
        <Image
          layout='fill'
          objectFit='cover'
          src={
            (user.profilePicture && `${PF}/person/${user.profilePicture}`) ||
            `${PF}/person/noAvatar.webp`
          }
          alt=''
        />
      </div>
      <input
        type='text'
        ref={commentInput}
        placeholder='Write a comment...'
        className={styles.commentInput}
      />
    </form>
  );
};
export default NewComment;
