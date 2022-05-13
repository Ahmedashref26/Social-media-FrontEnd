import Friend from '../components/Friend/Friend';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { searchUsers } from '../util/API';
import Navbar from '../components/Navbar/Navbar';

const searchPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState();

  const { q } = router.query;

  useEffect(() => {
    searchUsers(q).then((data) => {
      setUsers(data.users);
    });
  }, [q]);

  console.log(router.query);
  return (
    <>
      <Navbar />
      <div
        style={{
          width: '60%',
          borderRadius: '10px',
          boxShadow: '0px 0px 16px -8px rgba(0, 0, 0, 0.68)',
          margin: '30px auto',
        }}
      >
        <div style={{ padding: '10px', position: 'relative' }}>
          {users &&
            users.length > 0 &&
            users.map((user) => (
              <Link
                key={user._id}
                style={{ cursor: 'pointer' }}
                href={`/profile/${user.username}`}
              >
                <a>
                  <Friend user={user} />
                </a>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};
export default searchPage;
