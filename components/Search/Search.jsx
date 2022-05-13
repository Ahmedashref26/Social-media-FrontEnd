import { Search as SearchIcon } from '@mui/icons-material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { searchUsers } from '../../util/API';
import Friend from '../Friend/Friend';
import styles from './Search.module.scss';

const Search = () => {
  const [q, setQ] = useState('');
  const [users, setUsers] = useState([]);
  const [more, setMore] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (q.trim().length > 0) setSearching(true);
    if (q.trim().length === 0) setSearching(false);

    if (q.trim().length > 0) {
      searchUsers(q, 8).then((data) => {
        setUsers(data.users);
        setMore(data.total > data.results);
      });
    }
  }, [q]);

  return (
    <div className={styles.search}>
      <div className={styles.searchbar}>
        <SearchIcon className={styles.searchIcon} />
        <input
          placeholder='Search for friends, posts, or videos'
          className={styles.searchInput}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      {searching && (
        <div className={styles.searchResults}>
          {users.length === 0 && <span>No Results</span>}
          {users &&
            users.length > 0 &&
            users.map((user) => (
              <Link
                key={user._id}
                className={styles.searchResultsLink}
                href={`/profile/${user.username}`}
              >
                <a
                  onClick={() => {
                    setQ('');
                    setSearching(false);
                  }}
                >
                  <Friend user={user} />
                </a>
              </Link>
            ))}
          {more && (
            // <Link href={`/search?q=${q}`}>
            <span className={styles.searchMore}>See more</span>
            // </Link>
          )}
        </div>
      )}
    </div>
  );
};
export default Search;
