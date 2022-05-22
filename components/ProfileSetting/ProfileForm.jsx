import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { updateInfo, uploadFile } from '../../util/API';
import Alert from '../Alert/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const ProfileForm = ({ styles }) => {
  const {
    data: { user },
  } = useSession();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const PF = process.env.PUBLIC_FOLDER;

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedInfo = {
      name,
      email,
    };

    if (file) {
      const data = new FormData();
      data.append('file', file);

      const filename = await uploadFile(data);
      updatedInfo.profilePicture = filename;
    }

    const res = await updateInfo(updatedInfo);
    setFile(null);
    setLoading(false);
    setMessage(res);
    setName(res.user?.name || user.name);
    setEmail(res.user?.email || user.email);
  };

  return (
    <div className={styles['user-view__form-container']}>
      {message && <Alert variant={message.status} msg={message.msg} time={7} />}
      <h2 className={`${styles['heading-secondary']} ${styles['ma-bt-md']}`}>
        Your account settings
      </h2>
      <form
        onSubmit={submitHandler}
        className={`${styles.form} ${styles['form-user-data']}`}
      >
        <div className={styles.form__group}>
          <label className={styles.form__label} htmlFor='name'>
            Name
          </label>
          <input
            className={styles.form__input}
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required='required'
          />
        </div>
        <div className={`${styles.form__group} ${styles['ma-bt-md']}`}>
          <label className={styles.form__label} htmlFor='email'>
            Email address
          </label>
          <input
            className={styles.form__input}
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required='required'
          />
        </div>
        <div
          className={`${styles.form__group} ${styles['form__photo-upload']}`}
        >
          <div className={styles['form__user-photo']}>
            {!file && (
              <Image
                width={200}
                height={200}
                src={
                  user.profilePicture
                    ? `${PF}/${user.profilePicture}`
                    : `${PF}/noAvatar.webp`
                }
                alt='User photo'
              />
            )}
            {file && (
              <Image
                width={200}
                height={200}
                src={URL.createObjectURL(file)}
                alt='User photo'
              />
            )}
          </div>
          <label htmlFor='profileImg'>
            <span className={styles['btn-text']}>Choose new photo</span>
            <input
              type='file'
              style={{ display: 'none' }}
              accept='.png, .jpeg, .jpg, .webp'
              id='profileImg'
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
        </div>
        <div className={`${styles.form__group} ${styles.right}`}>
          <button
            className={`${styles.btn} ${styles['btn--small']} ${styles['btn--green']}`}
          >
            {loading ? (
              <div style={{ padding: '0 47.1px' }}>
                <CircularProgress size={16} color='inherit' />
              </div>
            ) : (
              'Save settings'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default ProfileForm;
