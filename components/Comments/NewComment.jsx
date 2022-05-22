import Image from 'next/image';
import { useContext, useRef } from 'react';
import { addComment } from '../../util/API';
import SocketContext from '../../store/socketContext';

const NewComment = ({ styles, user, post, setComments, receiver, desc }) => {
  const { socket } = useContext(SocketContext);
  const commentInput = useRef();
  const PF = process.env.PUBLIC_FOLDER;

  const submitHandler = async (e) => {
    e.preventDefault();

    const comment = commentInput.current.value;
    const res = await addComment(post, { comment });
    if (res) {
      setComments((pre) => [...pre, res]);
      commentInput.current.value = '';
      socket.emit('sendNotification', {
        sender: user.name,
        receiver,
        type: 'comment',
        desc: desc.length > 20 ? `${desc.substring(0, 20)}...` : desc,
      });
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.commentNew}>
      <div className={styles.commentProfileImg}>
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
